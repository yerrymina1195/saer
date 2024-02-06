<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSondageRequest;
use App\Models\Sondage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SondageController extends Controller
{
    //pour la création d'un sondage
    public function store(CreateSondageRequest $request)
    {
        try 
        {
        $sondage = new Sondage();
        $sondage->titre = $request->titre;
        $sondage->contenu = json_encode($request->contenu);
        $sondage->utilisateur_id = Auth::user()->id;
        $sondage->save();

        return response()->json([
            'status_code' => 200,
            'status_message' => "Sondage créé avec succès",
            'sondage' => $sondage,
            'link' => url("api/sondage/{$sondage->id}")
            
        ]);

    } catch (Exception $e) {
        return response()->json($e);
    }
    }

    // liste des sondages d'un utilisateur
    // public function sondage()
    // {
    //     try 
    //     {
    //     $sond = Sondage::where('utilisateur_id', Auth::user()->id)->get();
    //     return response()->json([
    //         'status_code' => 200,
    //         'status_message' => "Liste de mes sondages créés",
    //         'titre' => $sond,
    //         // 'question' => explode(',', $sond->contenu)
            
    //     ]);

    // } catch (Exception $e) {
    //     return response()->json($e);
    // }
    // }



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


    // pour l'affichage d'un sondage
    public function singleSondage(Sondage $sondage)
    { 
        try 
        {
            $son = Sondage::where('id', $sondage->id)->firstOrFail();
            return response()->json([
            'status_code' => 200,
            'status_message' => "sondage généré",
            'titre' => $son->titre,
            'contenu' => explode(',', $son->contenu)
            
        ]);

    } catch (Exception $e) {
        return response()->json($e);
    }
    }
}
