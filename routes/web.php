<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\InventoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->middleware('verified')->name('dashboard');

    // Admin routes - temporarily without role middleware for testing
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        Route::post('users/{user}/send-welcome-email', [UserController::class, 'sendWelcomeEmail'])
            ->name('users.send-welcome-email');
    });

    // Doctor routes
    Route::resource('doctors', DoctorController::class);

    // Medical Records routes
    Route::resource('medical-records', MedicalRecordController::class);

    // Prescription routes
    Route::resource('prescriptions', PrescriptionController::class);

    // Billing routes
    Route::resource('billing', BillingController::class);

    // Inventory routes
    Route::resource('inventory', InventoryController::class);

    // Patient-specific routes that require email verification
    Route::middleware('verified')->group(function () {
        // Appointment routes (patients can book appointments)
        Route::resource('appointments', AppointmentController::class);
        Route::get('appointments/slots/available', [AppointmentController::class, 'getAvailableSlots'])
            ->name('appointments.available-slots');

        // Patient routes (patients can view their own data)
        Route::resource('patients', PatientController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
