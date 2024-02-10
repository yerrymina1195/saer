// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <nav className="bd-ligth shadow-2xl shadow-yellow-300 text-black fw-bold p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* les Liens à gauche (Logo, Accueil, A propos) */}
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold flex items-center">
            {/* Tu peux remplacer le code de l'image par ton propre code d'image */}
            <img src={logo} alt="Logo" className="mr-2 w-100 h-16 md:w-30 md:h-30" />
            
          </Link>
        </div>

        {/* Les Liens à droite (Connexion, Inscription) */}
        <div className="flex items-center">
          <Link to="/connexion" className="ml-4">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Username
          </Link>
          <Link to="/inscription" className="ml-4">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Déconnexion
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
