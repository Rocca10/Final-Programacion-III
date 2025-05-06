import React, { useState } from 'react';
import api from '../services/api';

const IngredienteForm = ({ onSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ingredientes', { nombre, foto });
      setMensaje('✅ Ingrediente agregado correctamente');
      setNombre('');
      setFoto('');
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al agregar ingrediente');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
          notrequired
        />
      </div>

      <button type="submit" className="btn btn-primary">Agregar</button>
      {mensaje && <div className="mt-2 alert alert-info">{mensaje}</div>}
    </form>
  );
};

export default IngredienteForm;
