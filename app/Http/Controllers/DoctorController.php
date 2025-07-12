<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DoctorController extends Controller
{
    /**
     * Display a listing of doctors.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $doctors = collect();

        if ($user->isAdmin() || $user->isDoctor()) {
            // Admin and doctors can see all doctors
            $doctors = Doctor::with('user')->latest()->get();
        }

        return Inertia::render('doctors/DoctorsList', [
            'doctors' => $doctors,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new doctor.
     */
    public function create(): Response
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Only administrators can create new doctors.');
        }

        return Inertia::render('doctors/DoctorForm', [
            'userRole' => $user->role,
        ]);
    }

    /**
     * Store a newly created doctor in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Only administrators can create new doctors.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:50|unique:doctors,license_number',
            'experience_years' => 'required|integer|min:0|max:50',
            'qualifications' => 'required|string|max:1000',
            'bio' => 'nullable|string|max:2000',
        ]);

        // Create user account
        $userAccount = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt('password'), // Default password
            'role' => 'doctor',
        ]);

        // Create doctor record
        $doctor = Doctor::create([
            'user_id' => $userAccount->id,
            'specialization' => $request->specialization,
            'license_number' => $request->license_number,
            'experience_years' => $request->experience_years,
            'qualifications' => $request->qualifications,
            'bio' => $request->bio,
        ]);

        return redirect()->route('doctors.index')
            ->with('success', 'Doctor created successfully.');
    }

    /**
     * Display the specified doctor.
     */
    public function show(Doctor $doctor): Response
    {
        $user = Auth::user();

        return Inertia::render('doctors/DoctorView', [
            'doctor' => $doctor->load('user'),
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for editing the specified doctor.
     */
    public function edit(Doctor $doctor): Response
    {
        $user = Auth::user();

        // Check if user has permission to edit this doctor
        if ($user->isDoctor()) {
            if ($doctor->user_id !== $user->id) {
                abort(403, 'You can only edit your own profile.');
            }
        } elseif (!$user->isAdmin()) {
            abort(403, 'Only administrators can edit doctor profiles.');
        }

        return Inertia::render('doctors/DoctorForm', [
            'doctor' => $doctor->load('user'),
            'userRole' => $user->role,
        ]);
    }

    /**
     * Update the specified doctor in storage.
     */
    public function update(Request $request, Doctor $doctor)
    {
        $user = Auth::user();

        // Check if user has permission to update this doctor
        if ($user->isDoctor()) {
            if ($doctor->user_id !== $user->id) {
                abort(403, 'You can only update your own profile.');
            }
        } elseif (!$user->isAdmin()) {
            abort(403, 'Only administrators can update doctor profiles.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $doctor->user_id,
            'phone' => 'required|string|max:20',
            'specialization' => 'required|string|max:255',
            'license_number' => 'required|string|max:50|unique:doctors,license_number,' . $doctor->id,
            'experience_years' => 'required|integer|min:0|max:50',
            'qualifications' => 'required|string|max:1000',
            'bio' => 'nullable|string|max:2000',
        ]);

        // Update user account
        $doctor->user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        // Update doctor record
        $doctor->update([
            'specialization' => $request->specialization,
            'license_number' => $request->license_number,
            'experience_years' => $request->experience_years,
            'qualifications' => $request->qualifications,
            'bio' => $request->bio,
        ]);

        return redirect()->route('doctors.show', $doctor)
            ->with('success', 'Doctor updated successfully.');
    }

    /**
     * Remove the specified doctor from storage.
     */
    public function destroy(Doctor $doctor)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Only administrators can delete doctors.');
        }

        $doctor->user->delete();
        $doctor->delete();

        return redirect()->route('doctors.index')
            ->with('success', 'Doctor deleted successfully.');
    }
}
