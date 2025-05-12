import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const RecetaDetalle = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [comentarioAEliminar, setComentarioAEliminar] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsuarioLogueado(payload);
    }
  }, [token]);

  const cargarReceta = async () => {
    try {
      const res = await api.get(`/recetas/${id}`);
      setReceta(res.data);
    } catch (err) {
      console.error('Error al obtener la receta', err);
    }
  };

  const cargarComentarios = async () => {
    try {
      const res = await api.get(`/comentarios/receta/${id}`, {
        headers: { 'x-token': token },
      });
      setComentarios(res.data);
    } catch (err) {
      console.error('Error al obtener comentarios', err);
    }
  };

  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    try {
      await api.post(
        '/comentarios',
        { recetaId: id, texto: nuevoComentario },
        { headers: { 'x-token': token } }
      );
      setNuevoComentario('');
      setMensaje('✅ Comentario enviado');
      cargarComentarios();
    } catch (err) {
      setMensaje('❌ Error al enviar el comentario');
    }
  };

  const eliminarComentario = async () => {
    try {
      await api.delete(`/comentarios/${comentarioAEliminar}`, {
        headers: { 'x-token': token },
      });
      setComentarioAEliminar(null);
      cargarComentarios();
    } catch (err) {
      console.error('Error al eliminar comentario', err);
    }
  };

  useEffect(() => {
    cargarReceta();
    cargarComentarios();
  }, [id]);

  if (!receta) return <p className="text-center mt-5">Cargando receta...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <motion.div
          className="card shadow p-4 mb-4"
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
          {receta.temporada && <p><strong>Temporada:</strong> {receta.temporada}</p>}

          <h5 className="mt-4">Ingredientes:</h5>
          <ul>
            {receta.ingredientes.map((i, idx) => (
              <li key={idx}>
                {i.cantidad} {i.unidad} de {i.ingrediente.nombre}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sección de Comentarios */}
        <div className="card shadow p-4 mb-5">
          <h4 className="mb-3">Comentarios 💬</h4>

          {token && (
            <form onSubmit={enviarComentario} className="mb-4">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Escribí tu comentario..."
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar comentario
              </button>
              {mensaje && <div className="mt-2 text-muted">{mensaje}</div>}
            </form>
          )}

          {comentarios.length === 0 ? (
            <p className="text-muted">No hay comentarios todavía.</p>
          ) : (
            <ul className="list-group">
              {comentarios.map((comentario) => {
                const puedeEliminar =
                  usuarioLogueado &&
                  (usuarioLogueado.id === comentario.usuarioId._id || usuarioLogueado.role === 'ADMIN');

                return (
                  <li key={comentario._id} className="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <strong>{comentario.usuarioId.username}:</strong> {comentario.texto}
                      <div className="text-muted small">
                        {new Date(comentario.fecha).toLocaleString()}
                      </div>
                    </div>
                    {puedeEliminar && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setComentarioAEliminar(comentario._id)}
                      >
                        🗑️
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      {comentarioAEliminar && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button type="button" className="btn-close" onClick={() => setComentarioAEliminar(null)}></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro que deseas eliminar el comentario?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setComentarioAEliminar(null)}>
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={eliminarComentario}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecetaDetalle;
