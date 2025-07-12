<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@clinic.com',
            'phone' => '+1234567890',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // Create doctor users and doctors
        $doctorUsers = [
            [
                'name' => 'Dr. Sarah Johnson',
                'email' => 'sarah.johnson@clinic.com',
                'phone' => '+1234567891',
                'specialization' => 'Cardiology',
                'qualifications' => 'MD, FACC - Board Certified Cardiologist',
                'license_number' => 'MD123456',
                'bio' => 'Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases.',
            ],
            [
                'name' => 'Dr. Michael Chen',
                'email' => 'michael.chen@clinic.com',
                'phone' => '+1234567892',
                'specialization' => 'Dermatology',
                'qualifications' => 'MD, FAAD - Board Certified Dermatologist',
                'license_number' => 'MD123457',
                'bio' => 'Dr. Michael Chen specializes in medical and surgical dermatology with expertise in skin cancer detection and treatment.',
            ],
            [
                'name' => 'Dr. Emily Rodriguez',
                'email' => 'emily.rodriguez@clinic.com',
                'phone' => '+1234567893',
                'specialization' => 'Pediatrics',
                'qualifications' => 'MD, FAAP - Board Certified Pediatrician',
                'license_number' => 'MD123458',
                'bio' => 'Dr. Emily Rodriguez is a pediatrician dedicated to providing comprehensive care for children from birth through adolescence.',
            ],
        ];

        foreach ($doctorUsers as $doctorData) {
            $user = User::create([
                'name' => $doctorData['name'],
                'email' => $doctorData['email'],
                'phone' => $doctorData['phone'],
                'role' => 'doctor',
                'password' => bcrypt('password'),
            ]);

            Doctor::create([
                'user_id' => $user->id,
                'specialization' => $doctorData['specialization'],
                'qualifications' => $doctorData['qualifications'],
                'license_number' => $doctorData['license_number'],
                'bio' => $doctorData['bio'],
            ]);
        }

        // Create patient users and patients
        $patientUsers = [
            [
                'name' => 'John Smith',
                'email' => 'john.smith@example.com',
                'phone' => '+1234567894',
                'date_of_birth' => '1985-03-15',
                'gender' => 'male',
                'address' => '123 Main St, City, State 12345',
                'emergency_contact_name' => 'Jane Smith',
                'emergency_contact_phone' => '+1234567897',
                'medical_history' => 'Hypertension, Type 2 Diabetes',
                'allergies' => 'Penicillin',
            ],
            [
                'name' => 'Maria Garcia',
                'email' => 'maria.garcia@example.com',
                'phone' => '+1234567895',
                'date_of_birth' => '1990-07-22',
                'gender' => 'female',
                'address' => '456 Oak Ave, City, State 12345',
                'emergency_contact_name' => 'Carlos Garcia',
                'emergency_contact_phone' => '+1234567898',
                'medical_history' => 'Asthma',
                'allergies' => 'Dust, Pollen',
            ],
            [
                'name' => 'David Wilson',
                'email' => 'david.wilson@example.com',
                'phone' => '+1234567896',
                'date_of_birth' => '1978-11-08',
                'gender' => 'male',
                'address' => '789 Pine Rd, City, State 12345',
                'emergency_contact_name' => 'Sarah Wilson',
                'emergency_contact_phone' => '+1234567899',
                'medical_history' => 'None',
                'allergies' => 'None',
            ],
        ];

        foreach ($patientUsers as $patientData) {
            $user = User::create([
                'name' => $patientData['name'],
                'email' => $patientData['email'],
                'phone' => $patientData['phone'],
                'role' => 'patient',
                'password' => bcrypt('password'),
            ]);

            Patient::create([
                'user_id' => $user->id,
                'date_of_birth' => $patientData['date_of_birth'],
                'gender' => $patientData['gender'],
                'address' => $patientData['address'],
                'emergency_contact_name' => $patientData['emergency_contact_name'],
                'emergency_contact_phone' => $patientData['emergency_contact_phone'],
                'medical_history' => $patientData['medical_history'],
                'allergies' => $patientData['allergies'],
            ]);
        }

        // Get the created doctors and patients
        $doctors = Doctor::all();
        $patients = Patient::all();

        // Create sample appointments
        $appointments = [
            [
                'patient_id' => $patients[0]->id,
                'doctor_id' => $doctors[0]->id,
                'appointment_date' => now()->addDays(2)->setTime(9, 0),
                'status' => 'scheduled',
                'reason' => 'Annual checkup and blood pressure monitoring',
                'notes' => 'Patient has history of hypertension',
            ],
            [
                'patient_id' => $patients[1]->id,
                'doctor_id' => $doctors[1]->id,
                'appointment_date' => now()->addDays(3)->setTime(14, 30),
                'status' => 'scheduled',
                'reason' => 'Skin rash examination',
                'notes' => 'Rash appeared 3 days ago',
            ],
            [
                'patient_id' => $patients[2]->id,
                'doctor_id' => $doctors[2]->id,
                'appointment_date' => now()->addDays(1)->setTime(10, 0),
                'status' => 'scheduled',
                'reason' => 'Child vaccination appointment',
                'notes' => 'Regular vaccination schedule',
            ],
            [
                'patient_id' => $patients[0]->id,
                'doctor_id' => $doctors[0]->id,
                'appointment_date' => now()->subDays(5)->setTime(11, 0),
                'status' => 'completed',
                'reason' => 'Follow-up consultation',
                'notes' => 'Blood pressure improved with medication',
            ],
            [
                'patient_id' => $patients[1]->id,
                'doctor_id' => $doctors[1]->id,
                'appointment_date' => now()->subDays(10)->setTime(15, 0),
                'status' => 'completed',
                'reason' => 'Dermatological consultation',
                'notes' => 'Treatment prescribed for skin condition',
            ],
        ];

        foreach ($appointments as $appointmentData) {
            Appointment::create($appointmentData);
        }
    }
}
