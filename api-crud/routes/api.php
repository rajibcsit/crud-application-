<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use  App\Http\Controllers\LessonController;



Route::post('auth/register', [AuthController::class, 'createUser']);
Route::post('auth/login', [AuthController::class, 'loginUser']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('auth-user', [AuthController::class, 'authUser']);
    Route::resource('lesson', LessonController::class)->except(['create', 'edit']);
});
