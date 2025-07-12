<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        'password_reset_token',
        'password_reset_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'string',
        ];
    }

    /**
     * Get the available roles.
     *
     * @return array<string>
     */
    public static function getAvailableRoles(): array
    {
        return ['admin', 'doctor', 'nurse', 'patient', 'staff'];
    }

    /**
     * Check if user has a specific role.
     *
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Check if user is an admin.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    /**
     * Check if user is a doctor.
     *
     * @return bool
     */
    public function isDoctor(): bool
    {
        return $this->hasRole('doctor');
    }

    /**
     * Check if user is a nurse.
     *
     * @return bool
     */
    public function isNurse(): bool
    {
        return $this->hasRole('nurse');
    }

    /**
     * Check if user is a patient.
     *
     * @return bool
     */
    public function isPatient(): bool
    {
        return $this->hasRole('patient');
    }

    /**
     * Check if user is staff.
     *
     * @return bool
     */
    public function isStaff(): bool
    {
        return $this->hasRole('staff');
    }
}
