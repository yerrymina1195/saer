<?php

use App\Http\Controllers\SondageController;
use App\Http\Controllers\UtilisateurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return 'welcom';
});

Route::post('/register', [UtilisateurController::class, 'register']);
Route::post('/login', [UtilisateurController::class, 'login']);
// Route::post('sondage/create', [SondageController::class, 'store']);


Route::middleware('auth:sanctum')->group(function() {
    Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
    Route::post('/sondage/create', [SondageController::class, 'store']);
    Route::get('/sondage/liste', [SondageController::class, 'sondage']);
    Route::get('/sondage/view', [SondageController::class, 'view']);
    Route::post('/send-mail/{sondage}', [SondageController::class, 'mail']);
    Route::get('/sondages', [SondageController::class, 'sondages']);
    Route::get('/sondage/{sondage}', [SondageController::class, 'show']);
    Route::post('/logout', [UtilisateurController::class, 'logout']);
    Route::post('/update', [UtilisateurController::class, 'update']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});
