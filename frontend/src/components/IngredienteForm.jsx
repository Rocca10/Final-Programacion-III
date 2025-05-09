import React, { useState } from 'react';
import api from '../services/api';

const IngredienteForm = ({ onSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/ingredientes', { nombre, foto });
      setNombre('');
      setFoto('');
      onSuccess(); // recarga lista
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('⚠️ El ingrediente ya está cargado.');
      } else {
        setError('❌ Ocurrió un error al agregar el ingrediente.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <div className="alert alert-warning">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Nombre del ingrediente</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">URL de la foto</label>
        <input
          type="text"
          className="form-control"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
};

export default IngredienteForm;
