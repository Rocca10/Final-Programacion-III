import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarouselRecetas from '../components/CarouselRecetas';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { motion } from 'framer-motion';
import SwiperHero from '../components/SwiperHero';


const Home = () => {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        const res = await api.get('/recetas');
        setRecetas(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error al cargar recetas destacadas', err);
      }
    };

    cargarRecetas();
  }, []);

  return (
    <>
      <Navbar />

<header style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
  {/* Fondo con swiper */}
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <SwiperHero />
  </div>

  {/* Capa oscura */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    }}
  />

  {/* Contenido encima */}
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    style={{
      position: 'relative',
      zIndex: 2,
      color: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <h1 style={{ fontSize: '4rem', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
      Bienvenido a <span style={{ color: '#ffc107' }}>ROCCETAS</span>
    </h1>
    <p style={{ fontSize: '1.3rem', marginTop: '1rem' }}>
      Las mejores recetas caseras, para todos los gustos.
    </p>
<div className="d-flex gap-3 mt-4">
  <Link to="/buscar-recetas" className="btn btn-warning btn-lg shadow">
    ¿Qué puedo cocinar?
  </Link>
  <Link to="/recetas" className="btn btn-warning btn-lg shadow">
    Ver Recetas
  </Link>
</div>

  </motion.div>
</header>


      {/* Sección de recetas destacadas */}
      <main style={{ backgroundColor: '#fffdf9', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '2.5rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 'bold',
            }}
          >
            Recetas destacadas 🍽️
          </motion.h2>

          <div className="row">
            {recetas.map((receta) => (
              <div className="col-md-4 mb-4" key={receta._id}>
                <Link
                  to={`/recetas/${receta._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={receta.foto || '/images/default-receta.png'}
                      className="card-img-top"
                      alt={receta.nombre}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{receta.nombre}</h5>
                      <p className="card-text">
                        {receta.tipoComida} - {receta.tipoCocina}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/recetas" className="btn btn-outline-warning btn-lg">
              Ver todas las recetas
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
