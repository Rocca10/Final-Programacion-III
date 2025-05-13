import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Recetas from './pages/Recetas';
import Ingredientes from './pages/Ingredientes';
import BuscarRecetas from './pages/BuscarRecetas';
import CrearReceta from './components/CrearReceta';
import Registro from './pages/Registro';
import UsuariosAdmin from './pages/UsuariosAdmin';
import Perfil from './pages/Perfil';
import RecetaDetalle from './pages/RecetaDetalle';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/ingredientes" element={<Ingredientes />} />
        <Route path='/buscar-recetas' element={<BuscarRecetas/>} />
        <Route path='/crear-receta' element={<CrearReceta/>}/>
        <Route path='/admin/usuarios' element={<UsuariosAdmin/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path="/recetas/:id" element={<RecetaDetalle />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
