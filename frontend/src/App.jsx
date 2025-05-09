import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Recetas from './pages/Recetas';
import Ingredientes from './pages/Ingredientes';
import BuscarRecetas from './components/BuscarRecetas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/ingredientes" element={<Ingredientes />} />
        <Route path='/buscar-recetas' element={<BuscarRecetas/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
