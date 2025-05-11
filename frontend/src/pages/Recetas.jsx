import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const Recetas = () => {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const res = await api.get('/recetas');
        setRecetas(res.data);
      } catch (error) {
        console.error('Error al cargar recetas:', error);
      }
    };

    fetchRecetas();
  }, []);

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
          🍴 Nuestras Recetas Destacadas
        </motion.h2>

        <div className="row">
          {recetas.map((receta) => (
            <div className="col-md-4 mb-4" key={receta._id}>
              <Link to={`/recetas/${receta._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  className="card h-100 shadow-sm"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                    transition: { duration: 0.3 }
                  }}
                >
                  <img
                    src={receta.foto || '/images/default-receta.jpg'}
                    className="card-img-top"
                    alt={receta.nombre}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{receta.nombre}</h5>
                    <p className="card-text">
                      {receta.descripcion || 'Sin descripción'}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recetas;
