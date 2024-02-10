import React, { useState, useEffect } from 'react';
import axios from 'axios';

let token = localStorage.getItem('token');

const AfficherSondage = () => {
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState([]);
    useEffect(() => {
        // Récupérer les données du sondage depuis l'API
        const recupererDonnees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/sondage/1', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                console.log(response.data);
                setTitre(response.data.titre)
                setContenu(response.data.contenu);
            } catch (erreur) {
                console.error('Erreur lors de la récupération des données du sondage :', erreur);
            }
        };

        return () => {

            recupererDonnees();
        }
        // recupererDonnees();

    }, []); // L'effet sera exécuté une seule fois lors du montage du composant


    return (
        <div>

            {
                contenu.length === 0 ? (<div

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
                </div>) : (<h2 className="text-black my-4">Sondage {titre}</h2>)
            }

            <ul>
                <h3 className='bg-orange-600'>{titre}</h3>
                <ul>
                    {contenu.map((question, indexQuestion) => (
                        <li key={indexQuestion}>
                            <p className='text-black'>Question {indexQuestion + 1}</p>
                            <p className='text-black'>{question.question}</p>
                            <ul>
                                <p className='bg-orange-600'> options</p>
                                {question.options.map((option, indexOption) => (
                                    <li key={indexOption}>
                                        <input
                                            type="checkbox"
                                            id={`option-${indexQuestion}-${indexOption}`}
                                            name={`option-${indexQuestion}`}
                                            value={option}
                                        />
                                        <label htmlFor={`option-${indexQuestion}-${indexOption}`} className='text-black'>{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </ul>


        </div>
    );
};

export default AfficherSondage;
