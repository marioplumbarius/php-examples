<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::controller(TicketController::class)->group(function () {
        Route::get('tickets', 'index')->name('tickets');
        Route::post('tickets/{id}/acknowledge', 'acknowledge')->name('tickets.acknowledge');
        Route::post('tickets/{id}/close', 'close')->name('tickets.close');
    });
});
