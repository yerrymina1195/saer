import React, { useState, useEffect } from 'react';
import axios from 'axios';

let token = sessionStorage.getItem('token');
console.log(token);

const AfficherSondage = () => {
  const [donneesSondage, setDonneesSondage] = useState([]);
  useEffect(() => {
    // Récupérer les données du sondage depuis l'API
    const recupererDonnees = async () => {
      try {
        const reponse = await axios.get('http://localhost:8000/api/sondage/liste', {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        console.log(reponse);
        setDonneesSondage(reponse.data.sondages);
      } catch (erreur) {
        console.error('Erreur lors de la récupération des données du sondage :', erreur);
      }
    };

    return ()=> {

      recupererDonnees();
    }
    // recupererDonnees();

  }, []); // L'effet sera exécuté une seule fois lors du montage du composant


    return (
        <div>

          {
            donneesSondage.length === 0 ? (  <div
             
              className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
            >
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <h2 className="text-center text-white text-xl font-semibold">
                Chargement...
              </h2>
              <p className="w-1/3 text-center text-white">
                Cela peut prendre quelques secondes, veuillez ne pas fermer cette
                page.
              </p>
            </div>): (<h2>listes sondages</h2>) 
          }
          
            {/* <h2 className={donneesSondage.length === 0 ? 'text-red-600' : 'text-lime-500'}>Liste des sondages</h2> */}
            <ul>
                {donneesSondage.map((sondage, index) => (
                    <li key={index}>
                        <h3 className='bg-gray-700'>{sondage.titre}</h3>
                        <ul>
                            {sondage.contenu.map((question, indexQuestion) => (
                              <li key={indexQuestion}>
                                  <p className='text-lime-400'>Questions :</p>
                                    <p className='text-amber-600'>{question.question}</p>
                                    <ul>
                                      <p className='bg-sky-800'> options</p>
                                        {question.options.map((option, indexOption) => (
                                            <li key={indexOption}>{option}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AfficherSondage;
