import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const res = await api.get('/recetas');
        setRecetas(res.data);
      } catch (error) {
        console.error('Error al cargar recetas:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsuario(payload);
    }

    fetchRecetas();
  }, []);

  const eliminarReceta = async (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta receta?')) {
      try {
        await api.delete(`/recetas/${id}`);
        setRecetas((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        console.error('Error al eliminar la receta:', err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#343a40',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <span style={{ color: '#ffc107', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            🍴 Nuestras Recetas Destacadas
          </span>
        </motion.h2>

        <div className="row">
          {recetas.map((receta) => (
            <RecetaCard
              key={receta._id}
              receta={receta}
              esAdmin={usuario?.role === 'ADMIN'}
              onDelete={eliminarReceta}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const RecetaCard = ({ receta, esAdmin, onDelete }) => {
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseDown = (e) => {
    if (!esAdmin) return;
    e.preventDefault(); // Previene click inmediato
    const id = setTimeout(() => {
      setMostrarBoton(true);
    }, 1000);
    setTimeoutId(id);
  };

  const handleMouseUp = () => clearTimeout(timeoutId);

  return (
    <div className="col-md-4 mb-4">
      <motion.div
        className="card h-100 shadow-sm"
        whileHover={{ scale: 1.03 }}
        style={{ position: 'relative' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Link
          to={`/recetas/${receta._id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <img
            src={receta.foto || '/images/default-receta.jpg'}
            className="card-img-top"
            alt={receta.nombre}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Link>

        <div className="card-body">
          <h5 className="card-title">{receta.nombre}</h5>
          <p className="card-text">{receta.descripcion || 'Sin descripción'}</p>

          {mostrarBoton && esAdmin && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="btn btn-danger btn-sm mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(receta._id);
              }}
            >
              Eliminar
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Recetas;
