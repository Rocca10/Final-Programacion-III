import React from 'react';
import { Link } from 'react-router-dom';

const RecetaCard = ({ receta }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={receta.foto || '/images/default-receta.jpg'}
          className="card-img-top"
          alt={receta.nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{receta.nombre}</h5>
          <p className="card-text flex-grow-1">
            <strong>Tipo:</strong> {receta.tipoComida} - {receta.tipoCocina}<br />
            <strong>Dificultad:</strong> {receta.nivelDificultad}<br />
            <strong>Tiempo:</strong> {receta.tiempoPreparacion}
          </p>
          <Link
            to={`/recetas/${receta._id}`}
            className="btn btn-outline-primary mt-2"
          >
            Ver más
          </Link>
        </div>
        <div className="card-footer text-end">
          <span className="badge bg-success">{receta.likeCount || 0} ❤️</span>
        </div>
      </div>
    </div>
  );
};

export default RecetaCard;
