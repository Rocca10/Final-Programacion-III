import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recetas from "./pages/Recetas";
import Ingredientes from "./pages/Ingredientes";
import BuscarRecetas from "./pages/BuscarRecetas";
import CrearReceta from "./components/CrearReceta";
import Registro from "./pages/Registro";
import UsuariosAdmin from "./pages/UsuariosAdmin";
import Perfil from "./pages/Perfil";
import RecetaDetalle from "./pages/RecetaDetalle";
import ScrollToTop from "./components/ScrollToTop";
import RutaPrivada from "./components/RutaPrivada";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Privadas */}
        <Route
          path="/home"
          element={
            <RutaPrivada>
              <Home />
            </RutaPrivada>
          }
        />
        <Route
          path="/recetas"
          element={
            <RutaPrivada>
              <Recetas />
            </RutaPrivada>
          }
        />
        <Route
          path="/ingredientes"
          element={
            <RutaPrivada>
              <Ingredientes />
            </RutaPrivada>
          }
        />
        <Route
          path="/buscar-recetas"
          element={
            <RutaPrivada>
              <BuscarRecetas />
            </RutaPrivada>
          }
        />
        <Route
          path="/crear-receta"
          element={
            <RutaPrivada>
              <CrearReceta />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <RutaPrivada>
              <UsuariosAdmin />
            </RutaPrivada>
          }
        />
        <Route
          path="/perfil"
          element={
            <RutaPrivada>
              <Perfil />
            </RutaPrivada>
          }
        />
        <Route
          path="/recetas/:id"
          element={
            <RutaPrivada>
              <RecetaDetalle />
            </RutaPrivada>
          }
        />
         {/* Ruta no encontrada redirige al login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
