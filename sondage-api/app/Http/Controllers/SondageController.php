<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSondageRequest;
use App\Mail\SondageMail;
use App\Models\Sondage;
use App\Models\Utilisateur;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use PhpParser\Node\Stmt\TryCatch;

class SondageController extends Controller
{
    //pour la création d'un sondage
    public function store(CreateSondageRequest $request)
    {
        try {
            $sondage = new Sondage();
            $sondage->titre = $request->titre;
            $sondage->contenu = json_encode($request->contenu);
            $sondage->utilisateur_id = Auth::user()->id;
            $sondage->save();

            return response()->json([
                'status_code' => 200,
                'status_message' => "Sondage créé avec succès",
                'sondage' => $sondage,
                'lien' => url("api/sondage/{$sondage->id}")

            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    // pour afficher le dernier sondage créé par un utilisateur
    public function view()
    {
        try {
            $sond = Sondage::where('utilisateur_id', Auth::user()->id)->latest()->firstOrFail();
            return response()->json([
                'status_code' => 200,
                'status_message' => "dernier sondage créé",
                'titre' => $sond->titre,
                'contenu' => json_decode($sond->contenu)

            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    // pour afficher le dernier sondage créé par un utilisateur
    public function sondage()
{
    try 
    {
        $sondages = Sondage::where('utilisateur_id', Auth::user()->id)->get();

        $donnees = [];
        foreach ($sondages as $sondage) {
            $contenu = [];
            foreach (json_decode($sondage->contenu) as $question) {
                $contenu[] = [
                    'question' => $question->question,
                    'options' => $question->options
                ];
            }
            $donnees[] = [
                'titre' => $sondage->titre,
                'contenu' => $contenu
            ];
        }

        return response()->json([
            'status_code' => 200,
            'status_message' => "Liste de mes sondages créés",
            'sondages' => $donnees
        ]);

    } catch (Exception $e) {
        return response()->json($e);
    }
}
    //retourne le sondage selectionné 
    public function show(Sondage $sondage)
    {
        try {
            $son = Sondage::find($sondage)->firstOrFail();
            return response()->json([
                'status_code' => 200,
                'status_message' => "sondage selectionne",
                'titre' => $son->titre,
                'contenu' => json_decode($son->contenu)

            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }


    //liste des sondages associés à l'utilisateur connecté
    public function sondages()
    {
        try {
            $sondages = Sondage::where('utilisateur_id', Auth::user()->id)->get();
            $result = [];

            foreach ($sondages as $sondage) {
                $titre = $sondage->titre;
                $contenu = json_decode($sondage->contenu);

                $result[] = [
                    'titre' => $titre,
                    'contenu' => $contenu,
                ];
            }

            return response()->json([
                'status_code' => 200,
                'status_message' => "Liste de mes sondages créés",
                'sondages' => $result
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status_code' => 500,
                'status_message' => 'Internal Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    //pour partager le lien du sondage par mail
    public function mail(Sondage $sondage)
    {
        try {

            $email = Utilisateur::pluck('email');
            $mailData = [
                'title' => 'Sondage sur ' . $sondage->titre,
                'body' => url("api/sondage/{$sondage->id}")
            ];

            Mail::to($email)->send(new SondageMail($mailData));

            dd("Email is sent successfully.");
            return response()->json([
                'status_code' => 200,
                'status_message' => "email envoye avec succes",
                'sondage' => $sondage

            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
