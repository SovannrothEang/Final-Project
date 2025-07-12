<?php

use App\Http\Controllers\v1\AuthController;
use App\Http\Controllers\v1\brands\BrandAdminController;
use App\Http\Controllers\v1\brands\BrandController;
use App\Http\Controllers\v1\categories\CategoryAdminController;
use App\Http\Controllers\v1\categories\CategoryController;
use App\Http\Controllers\v1\images\ImageController;
use App\Http\Controllers\v1\products\ProductAdminController;
use App\Http\Controllers\v1\products\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/verify-token', [AuthController::class, 'verifyToken']);
    });
});

Route::prefix('/v1')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    // Brands
    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/brands/{id}', [BrandController::class, 'show']);
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    // Images
    
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('/admin')->group(function () {
            Route::prefix('/products')->group(function () {
                Route::get('/', [ProductAdminController::class, 'index']);
                Route::get('/{id}', [ProductAdminController::class, 'show']);
                Route::post('/', [ProductAdminController::class, 'store']);
                Route::put('/{id}', [ProductAdminController::class, 'update']);
                Route::delete('/{id}', [ProductAdminController::class, 'destroy']);
            });
            Route::prefix('/images')->group(function () {
                Route::get('/', [ImageController::class, 'index']);
                Route::get('/{id}', [ImageController::class, 'show']);
                Route::post('/', [ImageController::class, 'store']);
                Route::put('/{id}', [ImageController::class, 'update']);
                Route::delete('/{id}', [ImageController::class, 'destroy']);
            });
            Route::prefix('/brands')->group(function () {
                Route::get('/', [BrandAdminController::class, 'index']);
                Route::get('/{id}', [BrandAdminController::class, 'show']);
                Route::post('/', [BrandAdminController::class, 'store']);
                Route::put('/{id}', [BrandAdminController::class, 'update']);
                Route::delete('/{id}', [BrandAdminController::class, 'destroy']);
            });
            Route::prefix('/categories')->group(function () {
                Route::get('/', [CategoryAdminController::class, 'index']);
                Route::get('/{id}', [CategoryAdminController::class, 'show']);
                Route::post('/', [CategoryAdminController::class, 'store']);
                Route::put('/{id}', [CategoryAdminController::class, 'update']);
                Route::delete('/{id}', [CategoryAdminController::class, 'destroy']);
            });
        });
    });
});
