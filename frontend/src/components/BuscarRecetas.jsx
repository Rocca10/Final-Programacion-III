import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from './Navbar';

const BuscarRecetas = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarIngredientes = async () => {
      try {
        const res = await api.get('/ingredientes');
        setIngredientes(res.data);
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
        <h2 className="text-center mb-4">¿Qué puedo cocinar? 🍽️</h2>

        {/* Ingredientes como íconos seleccionables */}
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

        {/* Resultados */}
        {mensaje && <div className="alert alert-warning">{mensaje}</div>}
        {recetas.length > 0 && (
          <div className="mt-4">
            <h4>Recetas encontradas:</h4>
            <div className="row">
              {recetas.map((receta) => (
                <div className="col-md-4" key={receta._id}>
                  <div className="card mb-3">
                    <img
                      src={receta.foto}
                      className="card-img-top"
                      alt={receta.nombre}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{receta.nombre}</h5>
                      <p className="card-text">
                        Tipo: {receta.tipoComida} <br />
                        Cocina: {receta.tipoCocina}
                      </p>
                    </div>
                  </div>
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
