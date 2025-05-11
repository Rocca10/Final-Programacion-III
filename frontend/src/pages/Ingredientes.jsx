import React, { useEffect, useState } from 'react';
import api from '../services/api';
import IngredienteForm from '../components/IngredienteForm';
import Navbar from '../components/Navbar';

const Ingredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarIngredientes = async () => {
    try {
      const res = await api.get('/ingredientes');
      setIngredientes(res.data.sort((a, b) => a.nombre.localeCompare(b.nombre))); // Ahi los ordeno por nombre
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar ingredientes', error);
    }
  };

  useEffect(() => {
    cargarIngredientes();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mt-5 pt-4">
      <h2 className="text-center mb-4">Gestión de Ingredientes 🧂</h2>

      {/* Formulario para agregar */}
      <IngredienteForm onSuccess={cargarIngredientes} />

      {/* Listado */}
      {loading ? (
        <p>Cargando ingredientes...</p>
      ) : ingredientes.length === 0 ? (
        <p>No hay ingredientes aún.</p>
      ) : (
        <ul className="list-group">
          {ingredientes.map((ingrediente) => (
            <li key={ingrediente._id} className="list-group-item d-flex align-items-center gap-3">
              <img
                src={
                  ingrediente.foto ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(ingrediente.nombre)}&background=random`
                }
                alt={ingrediente.nombre}
                width={50}
                height={50}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <span className="fw-semibold">{ingrediente.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
      </>
  );
};

export default Ingredientes;
