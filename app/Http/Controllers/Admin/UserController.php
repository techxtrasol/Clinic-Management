<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeUserMail;
use App\Models\User;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
  /**
   * Display a listing of users.
   */
  public function index(): Response
  {
    $users = User::latest()->get();

    // Group users by role and get counts
    $usersByRole = $users->groupBy('role');
    $roleCounts = [
      'admin' => $usersByRole->get('admin', collect())->count(),
      'doctor' => $usersByRole->get('doctor', collect())->count(),
      'nurse' => $usersByRole->get('nurse', collect())->count(),
      'patient' => $usersByRole->get('patient', collect())->count(),
      'staff' => $usersByRole->get('staff', collect())->count(),
    ];

    return Inertia::render('admin/UsersManagement', [
      'users' => $users,
      'usersByRole' => $usersByRole,
      'roleCounts' => $roleCounts,
      'roles' => User::getAvailableRoles(),
    ]);
  }

  /**
   * Show the form for creating a new user.
   */
  public function create(): Response
  {
    return Inertia::render('admin/CreateUser', [
      'roles' => User::getAvailableRoles(),
    ]);
  }

  /**
   * Store a newly created user in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|lowercase|email|max:255|unique:users',
      'phone' => 'required|string|max:20|unique:users',
      'role' => ['required', 'string', Rule::in(User::getAvailableRoles())],
    ]);

    // Generate a strong random password
    $password = Str::random(12);
    $hashedPassword = Hash::make($password);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'phone' => $request->phone,
      'role' => $request->role,
      'password' => $hashedPassword,
    ]);

    // Create role-specific records
    if ($request->role === 'patient') {
      Patient::create([
        'user_id' => $user->id,
        'date_of_birth' => '1990-01-01', // Default date
        'gender' => 'other', // Default gender
        'address' => 'Address to be updated',
        'emergency_contact_name' => 'Emergency contact to be updated',
        'emergency_contact_phone' => 'Emergency phone to be updated',
        'medical_history' => null,
        'allergies' => null,
      ]);
    } elseif ($request->role === 'doctor') {
      Doctor::create([
        'user_id' => $user->id,
        'specialization' => 'Specialization to be updated',
        'license_number' => 'LIC-' . Str::random(8),
        'years_of_experience' => 0,
        'qualifications' => 'Qualifications to be updated',
        'bio' => 'Bio to be updated',
      ]);
    }

    // Generate password reset token
    $token = Str::random(64);
    $user->update([
      'password_reset_token' => $token,
      'password_reset_expires_at' => now()->addHours(24),
    ]);

    return response()->json([
      'success' => true,
      'message' => 'User created successfully.',
      'user' => $user,
      'password' => $password,
      'reset_token' => $token,
    ]);
  }

  /**
   * Send welcome email with login credentials.
   */
  public function sendWelcomeEmail(Request $request, User $user)
  {
    $request->validate([
      'password' => 'required|string',
      'reset_token' => 'required|string',
    ]);

    // Send welcome email with credentials and reset link
    $resetUrl = route('password.reset.admin', $request->reset_token);
    Mail::to($user->email)->send(new WelcomeUserMail($user, $request->password, $resetUrl));

    return response()->json([
      'success' => true,
      'message' => 'Welcome email sent successfully.',
    ]);
  }

  /**
   * Display the specified user.
   */
  public function show(User $user): Response
  {
    return Inertia::render('admin/UserView', [
      'user' => $user,
    ]);
  }

  /**
   * Show the form for editing the specified user.
   */
  public function edit(User $user): Response
  {
    return Inertia::render('admin/EditUser', [
      'user' => $user,
      'roles' => User::getAvailableRoles(),
    ]);
  }

  /**
   * Update the specified user in storage.
   */
  public function update(Request $request, User $user)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
      'phone' => ['required', 'string', 'max:20', Rule::unique('users')->ignore($user->id)],
      'role' => ['required', 'string', Rule::in(User::getAvailableRoles())],
    ]);

    $user->update([
      'name' => $request->name,
      'email' => $request->email,
      'phone' => $request->phone,
      'role' => $request->role,
    ]);

    return redirect()->route('admin.users.index')
      ->with('success', 'User updated successfully.');
  }

  /**
   * Remove the specified user from storage.
   */
  public function destroy(User $user)
  {
    $user->delete();

    return redirect()->route('admin.users.index')
      ->with('success', 'User deleted successfully.');
  }
}
