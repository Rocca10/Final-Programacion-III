import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

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
      } catch (error) {
        console.error('Error al cargar ingredientes', error);
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
    <Navbar/>
    <div className="container mt-5 pt-4">
      <h2 className="text-center mb-4">¿Qué puedo cocinar? 🍽️</h2>

      <div className="mb-4">
        <h5>Seleccioná los ingredientes:</h5>
        <div className="row">
          {ingredientes.map((ing) => (
              <div className="col-md-3" key={ing._id}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={ing._id}
                  id={`ing-${ing._id}`}
                  onChange={() => handleCheck(ing._id)}
                  />
                <label className="form-check-label" htmlFor={`ing-${ing._id}`}>
                  {ing.nombre}
                </label>
              </div>
            </div>
          ))}
        </div>
        <button onClick={buscarRecetas} className="btn btn-success mt-3">
          Buscar Recetas
        </button>
      </div>

      {mensaje && <div className="alert alert-warning mt-3">{mensaje}</div>}

      <div className="row mt-4">
        {recetas.map((receta) => (
            <div className="col-md-4 mb-4" key={receta._id}>
            <div className="card h-100">
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
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
  );
};

export default BuscarRecetas;
