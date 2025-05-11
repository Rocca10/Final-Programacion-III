import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarouselRecetas from '../components/CarouselRecetas';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { motion } from 'framer-motion';

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

  const botonEstilo = "btn btn-warning btn-lg text-white shadow";

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          paddingTop: '90px',
          width: '100%',
          background: '#fffdf9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingInline: '1.5rem',
        }}
      >
        {/* Título principal */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px' }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#2e2e2e',
              marginBottom: '1rem',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Bienvenido a <span style={{ color: '#fc9400' }}>ROCCETAS</span> 👨‍🍳
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#5f5f5f',
              lineHeight: '1.8',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Descubrí, creá y compartí tus recetas favoritas con estilo.
          </p>
        </motion.div>

        {/* Carrusel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '90%',
            maxWidth: '1200px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
            marginBottom: '4rem',
          }}
        >
          <CarouselRecetas />
        </motion.div>

        {/* Secciones: recetas y buscador */}
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
            marginBottom: '5rem',
          }}
        >
          {/* Recetas destacadas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            style={{
              flex: '1 1 500px',
              backgroundImage: "url('/images/default-receta.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'hidden',
              color: 'white',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                Recetas destacadas ✨
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
{recetas.map((receta) => (
  <Link
    to={`/recetas/${receta._id}`}
    key={receta._id}
    style={{ textDecoration: 'none' }}
  >
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        display: 'flex',
        gap: '1rem',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 5px 10px rgba(0,0,0,0.05)',
        color: '#000',
        padding: '0.75rem 1rem',
        transition: '0.2s',
      }}
    >
      <div>
        <h6 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          {receta.nombre}
        </h6>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
          {receta.tipoComida} - {receta.tipoCocina}
        </p>
      </div>
    </motion.div>
  </Link>
))}

              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/recetas" className={botonEstilo}>
                  Ver todas las recetas
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Buscador de recetas */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            style={{
              flex: '1 1 500px',
              backgroundImage: "url('/images/chef-thinking.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2.5rem',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              color: 'white',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 0,
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' }}>
                ¿Qué puedo cocinar? 🍳
              </h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                Seleccioná los ingredientes que tenés y descubrí recetas mágicas con ellos.
              </p>
              <Link to="/buscar-recetas" className={botonEstilo}>
                Ir al buscador de recetas
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
