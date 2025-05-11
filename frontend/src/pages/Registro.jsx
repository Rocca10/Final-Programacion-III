import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/usuarios/public', {
        username,
        password,
        role: 'CLIENTE', 
      });
      setMensaje('✅ Registro exitoso. Redirigiendo...');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setMensaje(
        error.response?.data?.message || '❌ Error al registrar usuario'
      );
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundImage: 'url("/images/fondo-recetas.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '60px',
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
        }}
      >
        <h3 className="text-center mb-4">Registrarse</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Registrarme
          </button>
        </form>
        {mensaje && (
          <div className="alert alert-info mt-3 text-center">{mensaje}</div>
        )}
      </div>
    </div>
  );
};

export default Registro;
