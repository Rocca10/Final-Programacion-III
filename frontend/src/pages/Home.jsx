import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarouselRecetas from '../components/CarouselRecetas';
import Navbar from '../components/Navbar';
import api from '../services/api';

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

      <div
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
        {/* Título */}
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

        {/* Sección Recetas + ¿Qué puedo cocinar? */}
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
          <div
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
                  <div
                    key={receta._id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#ffffff',
                      boxShadow: '0 5px 10px rgba(0,0,0,0.05)',
                      color: '#000',
                    }}
                  >

                    <div style={{ padding: '0.5rem 0', flex: 1 }}>
                      <h6 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{receta.nombre}</h6>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
                        {receta.tipoComida} - {receta.tipoCocina}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/recetas" className={botonEstilo}>
                  Ver todas las recetas
                </Link>
              </div>
            </div>
          </div>

          {/* ¿Qué puedo cocinar? */}
          <div
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
                
              </p>
              <Link to="/buscar-recetas" className={botonEstilo}>
                Ir al buscador de recetas
              </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
