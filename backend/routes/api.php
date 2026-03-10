<?php

use App\Http\Controllers\Api\CupboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\API\UserController;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    //authenticated routes
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // User management routes
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);

    // cupboard routes
    Route::get('/cupboards', [CupboardController::class, 'index']);
    Route::post('/cupboards', [CupboardController::class, 'store']);
    Route::get('/cupboards/{id}', [CupboardController::class, 'show']);
    Route::put('/cupboards/{id}', [CupboardController::class, 'update']);

    // place routes
    Route::get('/places', [PlaceController::class, 'index']);
    Route::post('/places', [PlaceController::class, 'store']);
    Route::get('/places/{id}', [PlaceController::class, 'show']);
    Route::put('/places/{id}', [PlaceController::class, 'update']);

    // item routes
    Route::get('/items', [\App\Http\Controllers\Api\ItemController::class, 'index']);
    Route::post('/items', [\App\Http\Controllers\Api\ItemController::class, 'store']);
    Route::get('/items/{id}', [\App\Http\Controllers\Api\ItemController::class, 'show']);
    Route::put('/items/{id}', [\App\Http\Controllers\Api\ItemController::class, 'update']);
    Route::post('/items/{id}/increment', [\App\Http\Controllers\Api\ItemController::class, 'increment']);
    Route::post('/items/{id}/decrement', [\App\Http\Controllers\Api\ItemController::class, 'decrement']);
});
