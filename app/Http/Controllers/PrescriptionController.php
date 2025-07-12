<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrescriptionController extends Controller
{
    public function index()
    {
        $prescriptions = Prescription::with(['patient.user', 'doctor.user', 'appointment'])->latest()->get();
        return Inertia::render('prescriptions/PrescriptionsList', [
            'prescriptions' => $prescriptions,
        ]);
    }

    public function show(Prescription $prescription)
    {
        $prescription->load(['patient.user', 'doctor.user', 'appointment']);
        return Inertia::render('prescriptions/PrescriptionView', [
            'prescription' => $prescription,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'medication' => 'required|string',
            'dosage' => 'required|string',
            'instructions' => 'nullable|string',
            'prescribed_at' => 'required|date',
        ]);
        $prescription = Prescription::create($data);
        return redirect()->route('prescriptions.index')->with('success', 'Prescription created.');
    }

    public function update(Request $request, Prescription $prescription)
    {
        $data = $request->validate([
            'medication' => 'required|string',
            'dosage' => 'required|string',
            'instructions' => 'nullable|string',
            'prescribed_at' => 'required|date',
        ]);
        $prescription->update($data);
        return redirect()->route('prescriptions.show', $prescription)->with('success', 'Prescription updated.');
    }

    public function destroy(Prescription $prescription)
    {
        $prescription->delete();
        return redirect()->route('prescriptions.index')->with('success', 'Prescription deleted.');
    }
}
