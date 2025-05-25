<?php

use Illuminate\Support\Facades\Route;
use App\Models\Blog;
use Inertia\Inertia;
use App\Http\Controllers\Api\BlogController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('home', function () {
        return Inertia::render('home');
    })->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('home');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('about', function () {
        return Inertia::render('about');
    })->name('about');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('catalog', function () {
        return Inertia::render('catalog');
    })->name('catalog');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('inside', function () {
        return Inertia::render('inside');
    })->name("What's Inside");
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('blog-form', function () {
        return Inertia::render('admin/blogForm');
    })->name("Add Blog");
});


Route::middleware(['auth', 'verified']) ->group(function(){
    Route::resource('blogs', BlogController::class);
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
