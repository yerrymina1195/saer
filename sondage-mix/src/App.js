
import './App.css';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import DisplaySurvey from './pages/DisplaySurvey';

function App() {
  return (     
    <div className="App">
      <header className="App-header">
       

        <BrowserRouter>
        <Routes>     
        <Route path="/" element={<Home/>}/>
        <Route path="/Inscription" element={<Inscription/>}/>
        <Route path="/Connexion" element={<Connexion/>}/>
        <Route path="/Form" element={<Form/>}/>
        <Route path="/DisplaySurvey" element={<DisplaySurvey/>}/>
        

        </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
