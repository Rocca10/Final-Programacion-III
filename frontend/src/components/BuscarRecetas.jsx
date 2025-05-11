import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

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
        {/* Título animado */}
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}
        >
          ¿Qué puedo cocinar? 🍽️
        </motion.h2>

        {/* Ingredientes */}
        <div className="mb-4">
          <h5>Seleccioná los ingredientes que tenés:</h5>
          <div className="row justify-content-center">
            {ingredientes.map((ing) => {
              const seleccionado = seleccionados.includes(ing._id);
              return (
                <div
                  key={ing._id}
                  className="col-4 col-sm-3 col-md-2 mb-3 text-center"
                  onClick={() => handleCheck(ing._id)}
                  style={{
                    cursor: 'pointer',
                    border: seleccionado ? '3px solid #28a745' : '2px solid #ccc',
                    borderRadius: '10px',
                    padding: '10px',
                    transition: 'all 0.2s',
                    backgroundColor: seleccionado ? '#eafaf1' : 'white',
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
              );
            })}
          </div>
          <div className="text-center">
            <button onClick={buscarRecetas} className="btn btn-success mt-3">
              Buscar Recetas
            </button>
          </div>
        </div>

        {/* Mensaje de error con animación */}
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

        {/* Resultados con animación */}
        {recetas.length > 0 && (
          <div className="mt-4">
            <h4>Recetas encontradas:</h4>
            <div className="row">
              {recetas.map((receta) => (
                <div className="col-md-4" key={receta._id}>
                  <motion.div
                    className="card mb-3"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                <img
                  src={receta.foto}
                  className="card-img-top"
                  alt={receta.nombre}
                  style={{ height: '200px', objectFit: 'cover', width: '100%' }} //Con esto hago que todos tengan el mismo tamaño.
                />

                    <div className="card-body">
                      <h5 className="card-title">{receta.nombre}</h5>
                      <p className="card-text">
                        Tipo: {receta.tipoComida} <br />
                        Cocina: {receta.tipoCocina}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuscarRecetas;
