import './App.css';
import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Partidos from './pages/Partidos';
import Estados from './pages/Estados';
import DetalhesDeputados from './pages/DetalhesDeputados';
import DetalhesPartido from './pages/DetalhesPartido';
import Deputados from './pages/Deputados';
import DetalhesDeputados2 from './pages/DetalhesDeputados2';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Menu/>

        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/partidos" element={<Partidos/>}/>
            <Route path="/estados" element={<Estados/>}/>
            <Route path="/deputados" element={<Deputados/>}/>
            <Route path="/detalhesdeputado/:id" element={<DetalhesDeputados/>}/>
            <Route path="/detalhespartido/:id" element={<DetalhesPartido/>}/>
            <Route path="/detalhesdeputado2/:id" element={<DetalhesDeputados2/>}/>
            
          </Routes>
        </Container>

      </BrowserRouter>

    </div>
  );
}

export default App;
