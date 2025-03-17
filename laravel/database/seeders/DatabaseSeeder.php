<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Mario Souza',
            'email' => 'test@example.com',
            'password' => '11111111'
        ]);

        Ticket::factory(10)->create([
            'user_id' => $user->id,
        ]);
    }
}
