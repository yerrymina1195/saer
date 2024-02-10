
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios.js";
import img1 from '../images/logo.png';

function Connexion() {
  const { setCurrentUser, setUserToken, setLoading } = useStateContext();
  const navitage = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmit = (e) => {
    e.preventDefault();
   

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        localStorage.setItem('token', data.token);
        setLoading(true);
        console.log(data);
        alert(`Bienvenue ${data.user.name}`);
        navitage('/Dashboard', { replace: true });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
         
        }
        console.error(error);
      });
  };

  const containerStyle = {
    width: '600px',
    height: '480px',
    
    display: 'flex',
    flexDirection: 'column', // Affichez en colonne pour les petits écrans
    position: 'relative',
    margin: '70px auto',
  };

  const imageContainerStyle = {
    flex: '1', // Pour que les deux colonnes aient une largeur égale
    backgroundImage: `url(${img1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  };

  const descriptionContainerStyle = {
    flex: '1', // Pour que les deux colonnes aient une largeur égale
    backgroundColor: '#e0e0e0', // Couleur d'arrière-plan de la colonne de description
  };

  const formStyle = {
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '300px',
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}></div>
      <div style={descriptionContainerStyle}>
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>
          )}
        </div> */}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form style={formStyle} className="space-y-6" onSubmit={onSubmit} action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email address
                  </span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block ">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                  </span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                Sign in
              </button>
            </div>
          </form>
          <h2 className="mt-2 text-center">
            <Link
              to="/inscription"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Connexion;




