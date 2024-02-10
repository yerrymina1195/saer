// @flow strict
import { Link } from 'react-router-dom';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import img1 from '../images/person.png';
import logo from '../images/logo.png';
import img1Section from '../images/yoro.JPG';
import img2Section from '../images/mouha.jpg';
import img3Section from '../images/massaer.jpeg';


function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${img1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
  };

  const circleContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
  };

  const circleStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const imageStyle = {
    width: '220px', // Ajustez la taille des cercles selon vos besoins
    height: '220px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '10px',
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-light shadow text-black fw-bold p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* les Liens à gauche (Logo, Accueil, A propos) */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold flex items-center">
              <img src={logo} alt="Logo" className="mr-2 w-100 h-16 md:w-30 md:h-30" />
              Accueil
            </Link>
          </div>

          {/* Les Liens à droite (Connexion, Inscription) */}
          <div className="flex items-center">
            <Link to="/connexion" className="ml-4">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Connexion
            </Link>
            <Link to="/inscription" className="ml-4">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      {/* Header separer en deux colonnes (l'un Background Image et l'autre Description) */}
      <header className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-cover bg-center relative" style={backgroundImageStyle}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Pour la responsivité la Colonne de la description (occupera 100% sur les petits écrans, 50% sur les écrans moyens et grands) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-white bg-custom-gold opacity-90" style={{ height: '400px' }}>
          <h1 className="text-5xl font-bold mb-6 text-white">Bienvenue sur notre plateforme de sondage</h1>
          <p className="text-xl mb-8 text-white">Participez à nos sondages et partagez votre opinion avec nous !!!</p>
          <Link to="/connexion">
            <button className="h-12 px-6 w-100 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
              Crer ton premiere Sondage
            </button>
          </Link>
        </div>
      </header>


      {/* Section en bas de la page */}
      <section>
        <h1 className="text-5xl font-bold mb-6 p-5">Des solutions qui créent des opportunités</h1>
        <p className="text-xl font-bold mb-8 p-3">Découvrez nos kits d’outils spécialisés, conçus pour votre métier et votre secteur d’activité.</p>
        {/* Colonne 1 */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          {/* Image 1 */}
          <div className="mb-8 sm:mb-0 sm:mr-8 sm:flex-1">
            <div style={circleStyle}>
              <img src={img1Section} alt="Image 1" style={imageStyle} />
              <p className="text-center"><h2 className='text-xl text-yellow font-bold'>Service client</h2>
    Améliorez l'expérience de vos clients tout en renforçant l'engagement de vos équipes.
  </p>
            </div>
          </div>

          {/* Image 2 */}
          <div className="mb-8 sm:mb-0 sm:mr-8 sm:flex-1">
            <div style={circleStyle}>
              <img src={img2Section} alt="Image 2" style={imageStyle} />
              <p className="text-center"><h2 className='text-xl text-yellow font-bold'>Gestion de produit</h2>
                Concevez des produits à fort impact, parfaitement adaptés à votre marché cible.
              </p>
            </div>
          </div>

          {/* Image 3 */}
          <div className="sm:flex-1">
            <div style={circleStyle}>
              <img src={img3Section} alt="Image 3" style={imageStyle} />
              <p className="text-center"><h2 className='text-xl custom-gold font-bold'>Engagement des employés</h2>
                Assurez-vous que vos employés sont satisfaits et productifs.
              </p>
            </div>
          </div>
        </div>

      </section>


{/* Footer */}
<footer className=" p-4 text-center">
  <p className="text-sm">© 2024 RxDForm. Tous droits réservés.</p>
</footer>

    </div>
  );
}

export default Home;


