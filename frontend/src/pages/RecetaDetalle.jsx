import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const RecetaDetalle = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        const res = await api.get(`/recetas/${id}`);
        setReceta(res.data);
      } catch (err) {
        console.error('Error al obtener la receta', err);
      }
    };

    fetchReceta();
  }, [id]);

  if (!receta) return <p className="text-center mt-5">Cargando receta...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <motion.div
          className="card shadow p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={receta.foto}
            alt={receta.nombre}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
          <h2>{receta.nombre}</h2>
          <p><strong>Tipo de comida:</strong> {receta.tipoComida}</p>
          <p><strong>Cocina:</strong> {receta.tipoCocina}</p>
          <p><strong>Dificultad:</strong> {receta.nivelDificultad}</p>
          <p><strong>Tiempo de preparación:</strong> {receta.tiempoPreparacion}</p>
          <p><strong>Ingrediente principal:</strong> {receta.ingredientePrincipal}</p>
          <p><strong>Método de cocción:</strong> {receta.metodoCoccion}</p>
          {receta.temporada && (
            <p><strong>Temporada:</strong> {receta.temporada}</p>
          )}

          <h5 className="mt-4">Ingredientes:</h5>
          <ul>
            {receta.ingredientes.map((i, idx) => (
              <li key={idx}>
                {i.cantidad} {i.unidad} de {i.ingrediente.nombre}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default RecetaDetalle;
