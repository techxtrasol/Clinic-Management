<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::with('doctor.user')->latest()->get();
        return Inertia::render('schedules/SchedulesList', [
            'schedules' => $schedules,
        ]);
    }

    public function show(Schedule $schedule)
    {
        $schedule->load('doctor.user');
        return Inertia::render('schedules/ScheduleView', [
            'schedule' => $schedule,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'required|string',
        ]);
        $schedule = Schedule::create($data);
        return redirect()->route('schedules.index')->with('success', 'Schedule created.');
    }

    public function update(Request $request, Schedule $schedule)
    {
        $data = $request->validate([
            'day_of_week' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
            'status' => 'required|string',
        ]);
        $schedule->update($data);
        return redirect()->route('schedules.show', $schedule)->with('success', 'Schedule updated.');
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return redirect()->route('schedules.index')->with('success', 'Schedule deleted.');
    }
}
