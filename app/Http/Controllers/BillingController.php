<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $billings = Billing::with(['patient.user', 'appointment'])->latest()->get();
        return Inertia::render('billing/BillsList', [
            'billings' => $billings,
        ]);
    }

    public function show(Billing $billing)
    {
        $billing->load(['patient.user', 'appointment']);
        return Inertia::render('billing/BillView', [
            'billing' => $billing,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'billed_at' => 'required|date',
            'notes' => 'nullable|string',
        ]);
        $billing = Billing::create($data);
        return redirect()->route('billing.index')->with('success', 'Bill created.');
    }

    public function update(Request $request, Billing $billing)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'billed_at' => 'required|date',
            'notes' => 'nullable|string',
        ]);
        $billing->update($data);
        return redirect()->route('billing.show', $billing)->with('success', 'Bill updated.');
    }

    public function destroy(Billing $billing)
    {
        $billing->delete();
        return redirect()->route('billing.index')->with('success', 'Bill deleted.');
    }
}
