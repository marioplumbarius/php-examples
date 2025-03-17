<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('tickets', function () {
        return Inertia::render('tickets');
    })->name('tickets');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/tickets.php';