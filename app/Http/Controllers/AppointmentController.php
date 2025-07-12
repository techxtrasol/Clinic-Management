<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    /**
     * Display a listing of appointments.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $appointments = collect();

        if ($user->isAdmin()) {
            // Admin sees all appointments
            $appointments = Appointment::with(['patient.user', 'doctor.user'])
                ->latest('appointment_date')
                ->get();
        } elseif ($user->isDoctor()) {
            // Doctor sees their own appointments
            $doctor = Doctor::where('user_id', $user->id)->first();
            if ($doctor) {
                $appointments = $doctor->appointments()
                    ->with(['patient.user'])
                    ->latest('appointment_date')
                    ->get();
            }
        } elseif ($user->isPatient()) {
            // Patient sees their own appointments
            $patient = Patient::where('user_id', $user->id)->first();
            if ($patient) {
                $appointments = $patient->appointments()
                    ->with(['doctor.user'])
                    ->latest('appointment_date')
                    ->get();
            }
        }

        return Inertia::render('appointments/AppointmentsList', [
            'appointments' => $appointments,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new appointment.
     */
    public function create(): Response
    {
        $user = Auth::user();
        $patients = collect();

        if ($user->isAdmin()) {
            // Admin can see all patients
            $patients = Patient::with('user')->get();
        } elseif ($user->isPatient()) {
            // Patient can only see themselves
            $patient = Patient::with('user')->where('user_id', $user->id)->first();
            if ($patient) {
                $patients = collect([$patient]);
            }
        }

        return Inertia::render('appointments/AppointmentForm', [
            'doctors' => Doctor::with('user')->get(),
            'patients' => $patients,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Store a newly created appointment in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date|after:now',
            'reason' => 'required|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Check if patient is booking for themselves (if they're a patient)
        if ($user->isPatient()) {
            $patient = Patient::where('user_id', $user->id)->first();
            if (!$patient || $patient->id != $request->patient_id) {
                abort(403, 'You can only book appointments for yourself.');
            }
        }

        // Check if the time slot is available
        $existingAppointment = Appointment::where('doctor_id', $request->doctor_id)
            ->where('appointment_date', $request->appointment_date)
            ->where('status', 'scheduled')
            ->first();

        if ($existingAppointment) {
            return back()->withErrors(['appointment_date' => 'This time slot is already booked.']);
        }

        $appointment = Appointment::create([
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
            'appointment_date' => $request->appointment_date,
            'status' => 'scheduled',
            'reason' => $request->reason,
            'notes' => $request->notes,
        ]);

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment booked successfully.');
    }

    /**
     * Display the specified appointment.
     */
    public function show(Appointment $appointment): Response
    {
        $user = Auth::user();

        // Check if user has permission to view this appointment
        if ($user->isPatient()) {
            $patient = Patient::where('user_id', $user->id)->first();
            if (!$patient || $appointment->patient_id !== $patient->id) {
                abort(403, 'You can only view your own appointments.');
            }
        } elseif ($user->isDoctor()) {
            $doctor = Doctor::where('user_id', $user->id)->first();
            if (!$doctor || $appointment->doctor_id !== $doctor->id) {
                abort(403, 'You can only view your own appointments.');
            }
        }

        return Inertia::render('appointments/AppointmentView', [
            'appointment' => $appointment->load(['patient.user', 'doctor.user']),
        ]);
    }

    /**
     * Show the form for editing the specified appointment.
     */
    public function edit(Appointment $appointment): Response
    {
        $user = Auth::user();

        // Check if user has permission to edit this appointment
        if ($user->isPatient()) {
            $patient = Patient::where('user_id', $user->id)->first();
            if (!$patient || $appointment->patient_id !== $patient->id) {
                abort(403, 'You can only edit your own appointments.');
            }
        } elseif ($user->isDoctor()) {
            $doctor = Doctor::where('user_id', $user->id)->first();
            if (!$doctor || $appointment->doctor_id !== $doctor->id) {
                abort(403, 'You can only edit your own appointments.');
            }
        }

        return Inertia::render('appointments/AppointmentForm', [
            'appointment' => $appointment->load(['patient.user', 'doctor.user']),
            'doctors' => Doctor::with('user')->get(),
            'patients' => Patient::with('user')->get(),
            'userRole' => $user->role,
        ]);
    }

    /**
     * Update the specified appointment in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        $user = Auth::user();

        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'status' => 'required|in:' . implode(',', Appointment::getAvailableStatuses()),
            'reason' => 'required|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Check if user has permission to update this appointment
        if ($user->isPatient()) {
            $patient = Patient::where('user_id', $user->id)->first();
            if (!$patient || $appointment->patient_id !== $patient->id) {
                abort(403, 'You can only update your own appointments.');
            }
            // Patients can only update their own appointments and can't change status
            $request->merge(['status' => $appointment->status]);
        } elseif ($user->isDoctor()) {
            $doctor = Doctor::where('user_id', $user->id)->first();
            if (!$doctor || $appointment->doctor_id !== $doctor->id) {
                abort(403, 'You can only update your own appointments.');
            }
        }

        $appointment->update($request->all());

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment updated successfully.');
    }

    /**
     * Remove the specified appointment from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $user = Auth::user();

        // Check if user has permission to delete this appointment
        if ($user->isPatient()) {
            $patient = Patient::where('user_id', $user->id)->first();
            if (!$patient || $appointment->patient_id !== $patient->id) {
                abort(403, 'You can only cancel your own appointments.');
            }
            // Patients can only cancel their appointments
            $appointment->update(['status' => 'cancelled']);
        } elseif ($user->isDoctor()) {
            $doctor = Doctor::where('user_id', $user->id)->first();
            if (!$doctor || $appointment->doctor_id !== $doctor->id) {
                abort(403, 'You can only cancel your own appointments.');
            }
        }

        $appointment->delete();

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment cancelled successfully.');
    }

    /**
     * Get available time slots for a doctor on a specific date.
     */
    public function getAvailableSlots(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date|after:today',
        ]);

        $date = $request->date;
        $doctorId = $request->doctor_id;

        // Get booked slots for the doctor on the specified date
        $bookedSlots = Appointment::where('doctor_id', $doctorId)
            ->whereDate('appointment_date', $date)
            ->where('status', 'scheduled')
            ->pluck('appointment_date')
            ->map(function ($date) {
                return $date->format('H:i');
            })
            ->toArray();

        // Generate available time slots (9 AM to 5 PM, 30-minute intervals)
        $availableSlots = [];
        $startTime = 9; // 9 AM
        $endTime = 17; // 5 PM

        for ($hour = $startTime; $hour < $endTime; $hour++) {
            for ($minute = 0; $minute < 60; $minute += 30) {
                $timeSlot = sprintf('%02d:%02d', $hour, $minute);
                if (!in_array($timeSlot, $bookedSlots)) {
                    $availableSlots[] = $timeSlot;
                }
            }
        }

        return response()->json([
            'available_slots' => $availableSlots,
            'booked_slots' => $bookedSlots,
        ]);
    }
}
