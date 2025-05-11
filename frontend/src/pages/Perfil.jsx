import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

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
      <div className="container mt-5 pt-4">
        <h2 className="text-center mb-4">Mi Perfil 👤</h2>
        {!usuario ? (
          <p className="text-center text-muted">No se pudo cargar el usuario</p>
        ) : (
          <div className="card shadow p-4">
            <p><strong>Usuario:</strong> {usuario.username}</p>
            <p><strong>Rol:</strong> {usuario.role}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Perfil;
