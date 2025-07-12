<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Patient;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:20|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'role' => 'patient', // Default role for new registrations
            'password' => Hash::make($request->password),
        ]);

        // Create a patient record for the new user
        Patient::create([
            'user_id' => $user->id,
            'date_of_birth' => '1990-01-01', // Default date, can be updated later
            'gender' => 'other', // Default gender, can be updated later
            'address' => 'Address to be updated',
            'emergency_contact_name' => 'Emergency Contact',
            'emergency_contact_phone' => '123-456-7890',
            'medical_history' => 'No significant medical history',
            'allergies' => 'None known',
        ]);

        event(new Registered($user));

        // For patients, require email verification before login
        if ($user->role === 'patient') {
            return redirect()->route('verification.notice')
                ->with('status', 'Please check your email for a verification link.');
        }

        // For other roles (admin-created users), login immediately
        Auth::login($user);
        return redirect()->intended(route('dashboard', absolute: false));
    }
}
