<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialization',
        'qualifications',
        'license_number',
        'bio',
    ];

    /**
     * Get the user that owns the doctor.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the appointments for the doctor.
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get the available specializations.
     */
    public static function getAvailableSpecializations(): array
    {
        return [
            'Cardiology',
            'Dermatology',
            'Endocrinology',
            'Gastroenterology',
            'General Medicine',
            'Neurology',
            'Oncology',
            'Orthopedics',
            'Pediatrics',
            'Psychiatry',
            'Radiology',
            'Surgery',
            'Urology',
        ];
    }

    /**
     * Get the doctor's full name.
     */
    public function getFullNameAttribute(): string
    {
        return $this->user->name;
    }

    /**
     * Get the doctor's email.
     */
    public function getEmailAttribute(): string
    {
        return $this->user->email;
    }

    /**
     * Get the doctor's phone.
     */
    public function getPhoneAttribute(): string
    {
        return $this->user->phone;
    }

    /**
     * Get the doctor's availability status.
     */
    public function getAvailabilityStatusAttribute(): string
    {
        // This could be enhanced with actual availability logic
        return 'available';
    }
}
