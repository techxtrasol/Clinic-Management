<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_of_birth',
        'gender',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_history',
        'allergies',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    /**
     * Get the user that owns the patient.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the appointments for the patient.
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get the available genders.
     */
    public static function getAvailableGenders(): array
    {
        return ['male', 'female', 'other'];
    }

    /**
     * Get the patient's full name.
     */
    public function getFullNameAttribute(): string
    {
        return $this->user->name;
    }

    /**
     * Get the patient's email.
     */
    public function getEmailAttribute(): string
    {
        return $this->user->email;
    }

    /**
     * Get the patient's phone.
     */
    public function getPhoneAttribute(): string
    {
        return $this->user->phone;
    }

    /**
     * Get the patient's age.
     */
    public function getAgeAttribute(): int
    {
        return $this->date_of_birth ? $this->date_of_birth->diffInYears(now()) : 0;
    }

    /**
     * Get the patient's upcoming appointments.
     */
    public function upcomingAppointments()
    {
        return $this->appointments()
            ->where('appointment_date', '>=', now())
            ->where('status', 'scheduled')
            ->orderBy('appointment_date');
    }

    /**
     * Get the patient's past appointments.
     */
    public function pastAppointments()
    {
        return $this->appointments()
            ->where('appointment_date', '<', now())
            ->orderBy('appointment_date', 'desc');
    }
}
