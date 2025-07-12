<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicalRecordController extends Controller
{
    public function index()
    {
        $records = MedicalRecord::with(['patient.user', 'doctor.user', 'appointment'])->latest()->get();
        return Inertia::render('medical-records/RecordsList', [
            'records' => $records,
        ]);
    }

    public function show(MedicalRecord $medicalRecord)
    {
        $medicalRecord->load(['patient.user', 'doctor.user', 'appointment']);
        return Inertia::render('medical-records/RecordView', [
            'record' => $medicalRecord,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'diagnosis' => 'required|string',
            'treatment' => 'nullable|string',
            'notes' => 'nullable|string',
            'record_date' => 'required|date',
        ]);
        $record = MedicalRecord::create($data);
        return redirect()->route('medical-records.index')->with('success', 'Medical record created.');
    }

    public function update(Request $request, MedicalRecord $medicalRecord)
    {
        $data = $request->validate([
            'diagnosis' => 'required|string',
            'treatment' => 'nullable|string',
            'notes' => 'nullable|string',
            'record_date' => 'required|date',
        ]);
        $medicalRecord->update($data);
        return redirect()->route('medical-records.show', $medicalRecord)->with('success', 'Medical record updated.');
    }

    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return redirect()->route('medical-records.index')->with('success', 'Medical record deleted.');
    }
}
