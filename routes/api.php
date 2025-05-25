<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Blog routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::post('/blogs', [BlogController::class, 'store'])->name('blogs.store');
    Route::put('/blogs/{id}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy'])->name('blogs.destroy');
});
