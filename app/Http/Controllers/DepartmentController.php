<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::latest()->get();
        return Inertia::render('departments/DepartmentsList', [
            'departments' => $departments,
        ]);
    }

    public function show(Department $department)
    {
        return Inertia::render('departments/DepartmentView', [
            'department' => $department,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $department = Department::create($data);
        return redirect()->route('departments.index')->with('success', 'Department created.');
    }

    public function update(Request $request, Department $department)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);
        $department->update($data);
        return redirect()->route('departments.show', $department)->with('success', 'Department updated.');
    }

    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->route('departments.index')->with('success', 'Department deleted.');
    }
}
