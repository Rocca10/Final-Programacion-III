import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BuscarRecetas = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarIngredientes = async () => {
      try {
        const res = await api.get('/ingredientes');
        setIngredientes(res.data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
      } catch (err) {
        console.error('Error al cargar ingredientes', err);
      }
    };

    cargarIngredientes();
  }, []);

  const handleCheck = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const buscarRecetas = async () => {
    try {
      const res = await api.post('/recetas/buscarPorIngredientes', {
        ingredientes: seleccionados,
      });
      setRecetas(res.data);
      setMensaje('');
    } catch (error) {
      setRecetas([]);
      setMensaje('❌ No se encontraron recetas con esos ingredientes.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}
        >
          ¿Qué puedo cocinar? 🍽️
        </motion.h2>

        {/* Lista de ingredientes */}
        <div className="mb-4">
          <h5>Seleccioná los ingredientes que tenés:</h5>
          <div className="row justify-content-center">
            {ingredientes.map((ing) => {
              const seleccionado = seleccionados.includes(ing._id);
              return (
                <motion.div
                  key={ing._id}
                  className="col-4 col-sm-3 col-md-2 mb-3 text-center"
                  onClick={() => handleCheck(ing._id)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      border: seleccionado ? '3px solid #28a745' : '2px solid #ccc',
                      borderRadius: '10px',
                      padding: '10px',
                      backgroundColor: seleccionado ? '#eafaf1' : 'white',
                      transition: 'all 0.2s',
                    }}
                  >
                    <img
                      src={ing.foto}
                      alt={ing.nombre}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginBottom: '0.5rem',
                        border: seleccionado ? '2px solid #28a745' : 'none',
                      }}
                    />
                    <div style={{ fontWeight: seleccionado ? 'bold' : 'normal' }}>{ing.nombre}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center">
            <button onClick={buscarRecetas} className="btn btn-success mt-3">
              Buscar Recetas
            </button>
          </div>
        </div>

        {mensaje && (
          <motion.div
            className="alert alert-warning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {mensaje}
          </motion.div>
        )}

        {/* Recetas encontradas */}
        {recetas.length > 0 && (
          <div className="mt-4">
            <h4>Recetas encontradas:</h4>
            <div className="row">
              {recetas.map((receta, index) => (
                <motion.div
                  key={receta._id}
                  className="col-md-4 mb-4 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to={`/recetas/${receta._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        border: '2px solid #ccc',
                        borderRadius: '10px',
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        cursor: 'pointer',
                        height: '100%',
                      }}
                    >
                      <img
                        src={receta.foto || '/images/default-receta.png'}
                        alt={receta.nombre}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginBottom: '0.5rem',
                        }}
                      />
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{receta.nombre}</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                        {receta.tipoComida} - {receta.tipoCocina}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuscarRecetas;
