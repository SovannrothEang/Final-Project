<?php

use App\Http\Controllers\v1\AuthController;
use App\Http\Controllers\v1\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/verify-token', [AuthController::class, 'verifyToken']);

    Route::apiResource('products', ProductController::class);
    // Route::apiResource('orders', OrderController::class);
    // Route::get('/orders', [OrderController::class, 'index']);
    // Route::get('/orders/{id}', [OrderController::class, 'show']);
    // Route::post('/orders', [OrderController::class, 'store']);
    // Route::post('/orders/{id}/checkout', [OrderController::class, 'checkout']);

});

