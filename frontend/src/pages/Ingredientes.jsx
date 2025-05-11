import React, { useEffect, useState } from 'react';
import api from '../services/api';
import IngredienteForm from '../components/IngredienteForm';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

// Función para verificar si el usuario logueado es admin
const getEsAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'ADMIN';
  } catch (e) {
    return false;
  }
};

const Ingredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const esAdmin = getEsAdmin();

  const cargarIngredientes = async () => {
    try {
      const res = await api.get('/ingredientes');
      setIngredientes(res.data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
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
      <Navbar />
      <div className="container mt-5 pt-4">
        <h2 className="text-center mb-4">Gestión de Ingredientes 🧂</h2>

        {/* Formulario solo para admin */}
        {esAdmin && <IngredienteForm onSuccess={cargarIngredientes} />}

        {/* Listado visual de ingredientes */}
        {loading ? (
          <p>Cargando ingredientes...</p>
        ) : ingredientes.length === 0 ? (
          <p>No hay ingredientes aún.</p>
        ) : (
          <div className="row justify-content-center">
            {ingredientes.map((ing) => (
              <motion.div
                key={ing._id}
                className="col-4 col-sm-3 col-md-2 mb-4 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    border: '2px solid #ccc',
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    src={
                      ing.foto ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(ing.nombre)}&background=random`
                    }
                    alt={ing.nombre}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '0.5rem',
                    }}
                  />
                  <div style={{ fontWeight: 'bold' }}>{ing.nombre}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Ingredientes;
