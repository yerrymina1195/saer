<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\Sondage;
use App\Models\Utilisateur;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UtilisateurController extends Controller
{
    public function register(RegisterUserRequest $request)
    { 
        try 
        {
        $user = new Utilisateur();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->telephone = $request->telephone;
        $user->password = Hash::make($request->password, [
        'round' => 12
        ]);
        $user->save();

        return response()->json([
            'status_code' => 200,
            'status_message' => "L'utilisateur a été bien ajouté",
            'user' => $user 
        ]);

    } catch (Exception $e) {
        return response()->json($e);
    } 
}

public function login(LoginUserRequest $request)
{
    if (Auth::guard('utilisateur')->attempt(['email' => $request['email'], 'password' => $request['password']])) {
        $user = Utilisateur::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('MA_CLE_DE_SECURITE')->plainTextToken;

        return response()->json([
            'status_code' => 200,
            'status_message' => "Connexion réussie",
            'user' => $user,
            'token' => $token
        ]); 
    } else {
        return response()->json([
            'status_code' => 403,
            'status_message' => "informations de connexion incorrect"
        ]);
    }
    
}

public function index(Request $request)
    {
        try {
            $query = Utilisateur::query();
            $perPage = 2;
            $page = $request->input('page', 1);
            $search = $request->input('search');

            if ($search) {
                $query->whereRaw("email LIKE '%" . $search . "%'");
            }
            $total = $query->count();
            $result = $query->offset(($page - 1) * $perPage)->limit($perPage)->get(); 

            return response()->json([
                'status_code' => 200,
                'status_message' => 'Liste des utilisateurs',
                'current_page' => $page,
                'last_page' => ceil($total / $perPage),
                'items' => $result
            ]);
            
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

}