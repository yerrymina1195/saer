<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
        {
            return [
                'name' => 'required|string',
                'email' => 'required|email|unique:utilisateurs,email',
                'telephone' => 'required|unique:utilisateurs,telephone',
                'password' => 'required|min:4',
                
            ];           
        }
    
        public function failedValidation(Validator $validator)
        {
            throw new HttpResponseException(response()->json([
                'success'=> false,
                'status_code' => 422,
                'error'=> true,
                'message'=>"erreur de validation",
                'errorsList'=> $validator->errors()
            ]));
        }
    
        public function messages()
        {
            return [
                'name.required' => "Le nom est obligatoire",
                'name.string' => "nom invalide",
                'email.required' => "L'email est obligatoire",
                'email.email' => "email invalide",
                'email.unique' => "cette email existe déjà",
                'telephone.required' => "Le numero de tetephone est obligatoire",
                'telephone.unique' => "numéro de téléphone existant",
                'password.required' => "Le mot de passe est obligatoire",
                'password.min' => "nombre de caractères minimum: 4"
            ];
            
        }
}
