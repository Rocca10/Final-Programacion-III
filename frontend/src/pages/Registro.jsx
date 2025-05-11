import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/public', {
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

  useEffect(() => {
    document.body.classList.add('sin-navbar');
    return () => {
      document.body.classList.remove('sin-navbar');
    };
  }, []);

  return (
    <>
      <h1
        style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '3.5rem',
          fontWeight: '900',
          textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
          zIndex: 10,
        }}
      >
        ROCCETAS
      </h1>

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

          <p className="mt-3 text-center">
            ¿Ya tenés una cuenta? <Link to="/">Ingresá</Link>
          </p>

          {mensaje && (
            <div className="alert alert-info mt-3 text-center">{mensaje}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Registro;
