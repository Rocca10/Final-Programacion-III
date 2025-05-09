import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CarouselRecetas from "../components/CarouselRecetas";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>


    <Navbar/>
      <div
        style={{
          paddingTop: "70px", // espacio para navbar
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // ya no lo centramos vertical porque hay más contenido
          alignItems: "center",
          textAlign: "center",
          paddingInline: "1rem",
        }}
      >
        <h1 className="display-4 fw-bold mt-3">Bienvenido a ROCCETAS 👨‍🍳</h1>
        <p className="lead mb-4">
          Desde aquí vas a poder explorar, crear y compartir tus recetas
          favoritas.
        </p>

        {/* Carrusel debajo del texto */}
        <CarouselRecetas />
      </div>
    </>
  );
};

export default Home;
