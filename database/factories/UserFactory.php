<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->unique()->phoneNumber(),
            'role' => fake()->randomElement(['admin', 'doctor', 'nurse', 'patient', 'staff']),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'admin',
        ]);
    }

    /**
     * Indicate that the user is a doctor.
     */
    public function doctor(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'doctor',
        ]);
    }

    /**
     * Indicate that the user is a nurse.
     */
    public function nurse(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'nurse',
        ]);
    }

    /**
     * Indicate that the user is a patient.
     */
    public function patient(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'patient',
        ]);
    }

    /**
     * Indicate that the user is staff.
     */
    public function staff(): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => 'staff',
        ]);
    }
}
