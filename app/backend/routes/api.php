<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum', 'json')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [AuthController::class, 'user']);

    Route::apiResource('products', ProductController::class);
    // Route::apiResource('orders', OrderController::class);
    // Route::get('/orders', [OrderController::class, 'index']);
    // Route::get('/orders/{id}', [OrderController::class, 'show']);
    // Route::post('/orders', [OrderController::class, 'store']);
    // Route::post('/orders/{id}/checkout', [OrderController::class, 'checkout']);

});

// Route::middleware(['web', 'auth:sanctum'])
//     ->group(function () {
//         Route::get('/docs', function () {
//             return view('l5-swagger.index');
//         });
//     });
