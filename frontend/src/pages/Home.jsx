import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CarouselRecetas from '../components/CarouselRecetas';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        const res = await api.get('/recetas');
        setRecetas(res.data.slice(0, 3)); // Tomamos las primeras 3
      } catch (err) {
        console.error('Error al cargar recetas destacadas', err);
      }
    };

    cargarRecetas();
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: '90px',
          minHeight: '100vh',
          width: '100%',
          background: '#fffdf9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingInline: '1.5rem',
        }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '800px' }}>
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
        </div>

        {/* Carrusel */}
        <div
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
        </div>

        {/* Recetas destacadas */}
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              marginBottom: '2rem',
              color: '#2e2e2e',
              textAlign: 'center',
            }}
          >
            Recetas destacadas ✨
          </h2>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {recetas.map((receta) => (
              <div
                key={receta._id}
                style={{
                  width: '300px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
                  textAlign: 'left',
                  transition: 'transform 0.3s',
                }}
              >
                <img
                  src={receta.foto || '/images/default-receta.jpg'}
                  alt={receta.nombre}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1rem' }}>
                  <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' }}>
                    {receta.nombre}
                  </h5>
                  <p style={{ fontSize: '0.95rem', color: '#555' }}>
                    Tipo: {receta.tipoComida} <br />
                    Cocina: {receta.tipoCocina}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para ver más */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/recetas" className="btn btn-outline-dark btn-lg">
              Ver todas las recetas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
