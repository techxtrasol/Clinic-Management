<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PatientController extends Controller
{
    /**
     * Display a listing of patients.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $patients = collect();

        if ($user->isAdmin() || $user->isDoctor()) {
            // Admin and doctors can see all patients (only users with 'patient' role)
            $patients = Patient::with('user')
                ->whereHas('user', function ($query) {
                    $query->where('role', 'patient');
                })
                ->latest()
                ->get();
        } elseif ($user->isPatient()) {
            // Patients can only see themselves
            $patient = Patient::where('user_id', $user->id)->first();
            if ($patient) {
                $patients = collect([$patient->load('user')]);
            }
        }

        return Inertia::render('patients/PatientsList', [
            'patients' => $patients,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new patient.
     */
    public function create(): Response
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Only administrators can create new patients.');
        }

        return Inertia::render('patients/PatientForm', [
            'userRole' => $user->role,
        ]);
    }

    /**
     * Store a newly created patient in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Only administrators can create new patients.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string|max:500',
            'emergency_contact' => 'required|string|max:255',
            'emergency_phone' => 'required|string|max:20',
            'blood_type' => 'nullable|string|max:10',
            'allergies' => 'nullable|string|max:1000',
            'medical_history' => 'nullable|string|max:2000',
        ]);

        // Create user account
        $userAccount = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt('password'), // Default password
            'role' => 'patient',
        ]);

        // Create patient record
        $patient = Patient::create([
            'user_id' => $userAccount->id,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'address' => $request->address,
            'emergency_contact' => $request->emergency_contact,
            'emergency_phone' => $request->emergency_phone,
            'blood_type' => $request->blood_type,
            'allergies' => $request->allergies,
            'medical_history' => $request->medical_history,
        ]);

        return redirect()->route('patients.index')
            ->with('success', 'Patient created successfully.');
    }

    /**
     * Display the specified patient.
     */
    public function show(Patient $patient): Response
    {
        $user = Auth::user();

        // Check if user has permission to view this patient
        if ($user->isPatient()) {
            if ($patient->user_id !== $user->id) {
                abort(403, 'You can only view your own profile.');
            }
        }

        return Inertia::render('patients/PatientView', [
            'patient' => $patient->load('user'),
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for editing the specified patient.
     */
    public function edit(Patient $patient): Response
    {
        $user = Auth::user();

        // Check if user has permission to edit this patient
        if ($user->isPatient()) {
            if ($patient->user_id !== $user->id) {
                abort(403, 'You can only edit your own profile.');
            }
        } elseif (!$user->isAdmin()) {
            abort(403, 'Only administrators can edit patient profiles.');
        }

        return Inertia::render('patients/PatientForm', [
            'patient' => $patient->load('user'),
            'userRole' => $user->role,
        ]);
    }

    /**
     * Update the specified patient in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $user = Auth::user();

        // Check if user has permission to update this patient
        if ($user->isPatient()) {
            if ($patient->user_id !== $user->id) {
                abort(403, 'You can only update your own profile.');
            }
        } elseif (!$user->isAdmin()) {
            abort(403, 'Only administrators can update patient profiles.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $patient->user_id,
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string|max:500',
            'emergency_contact' => 'required|string|max:255',
            'emergency_phone' => 'required|string|max:20',
            'blood_type' => 'nullable|string|max:10',
            'allergies' => 'nullable|string|max:1000',
            'medical_history' => 'nullable|string|max:2000',
        ]);

        // Update user account
        $patient->user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        // Update patient record
        $patient->update([
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'address' => $request->address,
            'emergency_contact' => $request->emergency_contact,
            'emergency_phone' => $request->emergency_phone,
            'blood_type' => $request->blood_type,
            'allergies' => $request->allergies,
            'medical_history' => $request->medical_history,
        ]);

        return redirect()->route('patients.show', $patient)
            ->with('success', 'Patient updated successfully.');
    }

    /**
     * Remove the specified patient from storage.
     */
    public function destroy(Patient $patient)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403, 'Only administrators can delete patients.');
        }

        $patient->user->delete();
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Patient deleted successfully.');
    }
}
