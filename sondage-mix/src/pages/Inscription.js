// @flow strict

import * as React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';


function Inscription() {
  const [fullName, setFullName] = useState('');                      
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  //const telephone= 1234567891 ;

  const onSubmit = (e) => {
    e.preventDefault();

   if (!fullName || !email || !password || !confirmation) {
    alert('Veuillez remplir tous les champs du formulaire.');
    return;
  }
    // Effectuer une requête POST vers l'API Laravel
    axios.post('https://api-survey-3.fewnu.app/api/register', {
      name: fullName,
      email,
      telephone,
      password,
      password_confirmation: confirmation,
      
    })
    .then((response) => {
      console.log(response.data);
      alert('Inscription réussie !');
      navigate("/connexion");
     
    })
    .catch((error) => {
      console.error(error);
      // Gérer les erreurs, par exemple afficher un message à l'utilisateur
    });
  };
  





    return (
        <div className=" text-black text-left sm:mx-auto sm:w-full sm:max-w-md ">

            {/* <p>Allez sur la <Link to="/connexion">page de connexion</Link>.</p> */}
            <form onSubmit={onSubmit} className="flex flex-col bg-white rounded shadow-2xl p-14 mt-10 pt-8 rounded-2xl from-blue-400 to-blue-200" style={{ backgroundColor: 'rgba(255, 159, 0, 0.8)' }} action="">
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Or{" "}
            <Link to="/connexion" className=" text-white hover:text-indigo-500">
              Login with your account
            </Link>
          </p>
                <label className="text-base text-white font-bold text-left" htmlFor="usernameField">Full Name</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded-xl rounded focus:outline-none focus:ring-2 text-black text-sm border border-blue-300 w-full" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />

                <label className="font-bold text-base text-white text-left" htmlFor="usernameField">Email address</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded-xl focus:outline-none focus:ring-2 text-black text-sm border border-blue-300 w-full"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />

                <label className="text-white font-bold text-base text-black text-left" htmlFor="usernameField">Telephone</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded-xl  focus:outline-none focus:ring-2 text-black text-sm border border-blue-300 w-full" 
                type="telephone" 
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                />

                <label className="text-white font-bold text-base text-black text-left mt-3" htmlFor="passwordField">Password</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded-xl  focus:outline-none focus:ring-2 text-black border border-blue-300 w-full"
                 type="password"
                 value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 />

                <label className="text-white font-bold text-base text-black text-left mt-3" htmlFor="confirmPasswordField">Confirm Password</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded-xl  focus:outline-none focus:ring-2 text-black border border-blue-300 w-full"
                 type="password" 
                 value={confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                 />

                <button type="submit" className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded-2xl  font-semibold text-sm text-white hover:bg-blue-700 w-full">S'inscrire</button>


            </form>
          
        </div>
    );
};

export default Inscription;