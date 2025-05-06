import React, { useEffect, useState } from 'react';
import api from '../services/api'; // tu cliente axios

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Recetas</h2>
      <div className="row">
        {recetas.map((receta) => (
          <div className="col-md-4 mb-4" key={receta._id}>
            <div className="card h-100">
              <img
                src={receta.imagen || '/images/default-receta.jpg'}
                className="card-img-top"
                alt={receta.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{receta.nombre}</h5>
                <p className="card-text">{receta.descripcion || 'Sin descripción'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recetas;
