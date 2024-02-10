
import './App.css';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Dashboard from './pages/Dashboard';
import CreateSurvey from './pages/CreateSurvey';
import Sondages from './pages/Sondages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplaySurvey from './pages/DisplaySurvey';
import Sondage from './pages/Sondage';
import Liste from './pages/Liste';

function App() {
  return (     
    <div className="App">
      <header className="App-header">
       

        <BrowserRouter>
        <Routes>     
        <Route path="/" element={<Home/>}/>
        <Route path="/Inscription" element={<Inscription/>}/>
        <Route path="/Connexion" element={<Connexion/>}/>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CreateSurvey" element={<CreateSurvey />} />
        <Route path="/Sondages" element={<Sondages />} />        
        <Route path="/DisplaySurvey" element={<DisplaySurvey/>}/>
        <Route path="/Sondage/:id" element={<Sondage/>}/>
        <Route path='/liste' element={<Liste/>}/>
        

        </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
