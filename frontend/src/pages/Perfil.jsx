import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuario({
          username: payload.username,
          role: payload.role,
        });
      }
    } catch (error) {
      console.error('Error al leer el token', error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container mt-5 pt-4"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1589923188900-94f62fba0203)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
        }}
      >
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontWeight: 'bold', color: '#222' }}
        >
          👤 Mi Perfil
        </motion.h2>

        {!usuario ? (
          <p className="text-center text-muted">No se pudo cargar el usuario</p>
        ) : (
          <div className="row justify-content-center g-4">
            <div className="col-md-6">
              <motion.div
                className="card p-4 text-center shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  border: '2px solid #007bff',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  minHeight: '150px',
                }}
              >
                <h5>🧑 Usuario</h5>
                <p style={{ fontSize: '1.4rem' }}>{usuario.username}</p>
              </motion.div>
            </div>

            <div className="col-md-6">
              <motion.div
                className="card p-4 text-center shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  border: '2px solid #28a745',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  minHeight: '150px',
                }}
              >
                <h5>🔐 Rol</h5>
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: usuario.role === 'ADMIN' ? '#28a745' : '#6c757d',
                  }}
                >
                  {usuario.role}
                </span>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Perfil;
