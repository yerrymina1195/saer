// App.js (ou ta page principale)
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { DefaultSidebar } from '../components/Sidebar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
    const navitage = useNavigate();
    const [titre, setSurveyTitle] = useState('');
    const [contenu, setQuestions] = useState([{ question: '', options: [''] }]);

    const handleQuestionTextChange = (index, value) => {
        const newQuestions = [...contenu];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...contenu];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...contenu, { question: '', options: [''] }]);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...contenu];
        newQuestions[questionIndex].options = [...newQuestions[questionIndex].options, ''];
        setQuestions(newQuestions);
    };

    const removeQuestion = (index) => {
        const newQuestions = [...contenu];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...contenu];
        newQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(newQuestions);
    };

    let token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoyer une requête POST à l'API Laravel
            const response = await axios.post('http://localhost:8000/api/sondage/create', {
                titre: titre,
                contenu: contenu,             
            },
            {
                headers: {
                    "Authorization" : `Bearer ${token}`
                },
            }
            );

            // Gérer la réponse, rediriger ou afficher un message de succès
            console.log('Sondage créé avec succès:', response.data);
            navitage('/DisplaySurvey', { replace: true });
        } catch (error) {
            // Gérer les erreurs, afficher un message d'erreur, etc.
            console.error('Erreur lors de la création du sondage:', error);
        }
    };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenu principal */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="">
          <DefaultSidebar />
        </div>

        {/* Contenu du Dashboard */}
        <div className="flex-grow p-4">
          {/* Bouton "Créer ton premier sondage" avec Link */}
          <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded shadow-2xl p-14 mt-4 rounded-2xl pt-0 mt-0  from-blue-400 to-blue-200">
            <h2 className="mt-0 mb-4 text-center text-2xl font-bold text-yellow-500 p-3 leading-9 tracking-tight text-gray-900">
                Créez Votre Sondage
            </h2>

            <label className="font-semibold text-base text-black text-left" htmlFor="surveyTitleField">
                Titre du sondage:
            </label>
            <input
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-black text-sm border border-blue-300 w-full"
                type="text"
                value={titre}
                onChange={(e) => setSurveyTitle(e.target.value)}
            />

            {contenu.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <textarea
                        id={`questionTextField-${questionIndex}`}
                        value={question.question}
                        onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                        className="flex items-center h-20 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-black border border-blue-300 w-full"
                        placeholder={`Texte de la Question ${questionIndex + 1}`}
                    />

                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center mt-2">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                className="flex items-center h-12 px-4 w-full bg-gray-200 rounded focus:outline-none focus:ring-2 text-black text-sm border border-blue-300"
                                placeholder={`Option ${optionIndex + 1}`}
                            />
                            {question.options.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeOption(questionIndex, optionIndex)}
                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addOption(questionIndex)}
                        className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
                    >
                        Ajouter une option
                    </button>

                    {contenu.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeQuestion(questionIndex)}
                            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Supprimer la Question
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={addQuestion}
                className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
            >
                Ajouter une Question
            </button>

            <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 mb-0 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 w-full"
            >
                Créer le sondage
            </button>
        </form>

          {/* <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded shadow-2xl p-14 mt-4 rounded-2xl pt-0 mt-0 from-blue-400 to-blue-200">
            <h2 className="mt-0 mb-4 text-center text-2xl p-3 text-yellow-500 font-bold leading-9 tracking-tight text-gray-900">
                Créez Votre Sondage
            </h2>

            <label className="font-semibold text-base text-black text-left" htmlFor="surveyTitleField">
                Titre du sondage:
            </label>
            <input
                className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-black text-sm border border-blue-300 w-full"
                type="text"
                value={titre}
                onChange={(e) => setSurveyTitle(e.target.value)}
            />

            {contenu.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <textarea
                        id={`questionTextField-${questionIndex}`}
                        value={question.question}
                        onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                        className="flex items-center h-20 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 text-black border border-blue-300 w-full"
                        placeholder={`Texte de la Question ${questionIndex + 1}`}
                    />

                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center mt-2">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                className="flex items-center h-12 px-4 w-full bg-gray-200 rounded focus:outline-none focus:ring-2 text-black text-sm border border-blue-300"
                                placeholder={`Option ${optionIndex + 1}`}
                            />
                            {question.options.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeOption(questionIndex, optionIndex)}
                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addOption(questionIndex)}
                        className="mt-2 bg-blue-600 text-white px-2 py-1 rounded"
                    >
                        Ajouter une option
                    </button>

                    {contenu.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeQuestion(questionIndex)}
                            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Supprimer la Question
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={addQuestion}
                className="mt-2 bg-custom-gold text-white px-2 py-1 rounded"
            >
                Ajouter une Question
            </button>

            <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 w-64 bg-green-500  mt-8 mb-0 rounded font-semibold text-xl text-white font-bold hover:bg-gray-700 w-full"
            >
                Créer le sondage
            </button>
        </form> */}
          
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreateSurvey;
