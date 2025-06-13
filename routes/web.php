<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Middleware\CheckAdmin;
use Inertia\Inertia;
use App\Models\Api\Item;

Route::get('/', fn () => Inertia::render('welcome'))->name('home');

// Shared auth group for verified users
Route::middleware(['auth', 'verified'])->group(function () {

    // Static pages
    Route::get('/home', fn () => Inertia::render('home'))->name('home');
    Route::get('/dashboard', fn () => Inertia::render('home'))->name('dashboard');
    Route::get('/about', fn () => Inertia::render('about'))->name('about');
    Route::get('/catalog', fn () => Inertia::render('catalog', ['items'=>Item::all()]))->name('catalog');
    Route::get('/inside', fn () => Inertia::render('inside'))->name("what.inside");

    // Payment routes
    Route::resource('/payments', PaymentController::class)
        ->only(['index', 'show', 'store', 'update'])
        ->names('payments');

    // Public user-accessible blog routes
    Route::resource('/blogs', BlogController::class)
        ->only(['index', 'show']);
});

// Admin-only group (must be authenticated, verified, AND pass CheckAdmin)
Route::middleware(['auth', 'verified', CheckAdmin::class])->group(function () {
    Route::get('/admin/item-form', fn()=> Inertia::render('admin/itemForm'))->name('admin.item.form');
    // Admin-only blog form view
    Route::get('/admin/blog-form', fn () => Inertia::render('admin/blogForm'))->name('admin.blog.form');

    // Admin-only blog management routes
    Route::resource('/blogs', BlogController::class)
        ->only(['store', 'update', 'destroy']);

    // Admin-only item management routes
    Route::resource('/items', ItemController::class)
        ->only(['index', 'store', 'show', 'update', 'destroy'])
        ->names('items');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
