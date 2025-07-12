<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Billing extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'appointment_id',
        'amount',
        'status',
        'billed_at',
        'notes',
    ];

    protected $casts = [
        'billed_at' => 'datetime',
        'amount' => 'float',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }
}
