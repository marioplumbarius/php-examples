<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{   
    public function definition(): array
    {
        $status = fake()->randomElement(['open', 'in progress', 'closed']);
        $acknowledged = $status === 'open' ? fake()->boolean() : true;
        
        return [
            'acknowledged' => $acknowledged,
            'description' => fake()->sentence(),
            'status' => $status,
            'title' => fake()->sentence(),
            'user_id' => User::factory(),
        ];
    }
}
