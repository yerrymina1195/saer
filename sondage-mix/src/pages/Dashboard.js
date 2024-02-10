// App.js (ou ta page principale)
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DefaultSidebar } from '../components/Sidebar';
import Footer from '../components/Footer';


const Dashboard = () => {
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
  <Link to="../CreateSurvey">
    <button className="bg-gray-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-2xl font-bold hover:bg-green-600">
      Créer ton premier sondage
    </button>
  </Link>
</div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;