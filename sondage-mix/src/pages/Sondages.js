// App.js (ou ta page principale)
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DefaultSidebar } from '../components/Sidebar';
import Footer from '../components/Footer';


const Sondages = () => {
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
        <div className="flex-grow p-4 flex items-center justify-center">
  {/* Bouton "Créer ton premier sondage" avec Link */}
  
</div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Sondages;
