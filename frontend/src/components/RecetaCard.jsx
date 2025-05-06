import React from 'react';

const RecetaCard = ({ receta }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={receta.foto}
          className="card-img-top"
          alt={receta.nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{receta.nombre}</h5>
          <p className="card-text">
            <strong>Tipo:</strong> {receta.tipoComida} - {receta.tipoCocina}<br />
            <strong>Dificultad:</strong> {receta.nivelDificultad}<br />
            <strong>Tiempo:</strong> {receta.tiempoPreparacion}
          </p>
        </div>
        <div className="card-footer text-end">
          <span className="badge bg-success">{receta.likeCount} ❤️</span>
        </div>
      </div>
    </div>
  );
};

export default RecetaCard;
