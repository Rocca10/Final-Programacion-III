import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', role: 'CLIENTE' });
  const [permitido, setPermitido] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const verificarPermiso = () => {
    const token = localStorage.getItem('token');
    if (!token) return setPermitido(false);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setPermitido(payload.role === 'ADMIN');
    } catch (e) {
      setPermitido(false);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      setMensaje('❌ No se pudieron cargar los usuarios');
    }
  };

  const editar = (usuario) => {
    setEditandoId(usuario._id);
    setForm({ username: usuario.username, role: usuario.role });
  };

  const cancelar = () => {
    setEditandoId(null);
    setForm({ username: '', password: '', role: 'CLIENTE' });
  };

  const guardar = async () => {
    try {
      await api.put(`/usuarios/${editandoId}`, form);
      setMensaje('✅ Usuario actualizado correctamente');
      setEditandoId(null);
      cargarUsuarios();
    } catch (err) {
      setMensaje('❌ Error al actualizar el usuario');
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Estás seguro que querés eliminar este usuario?')) return;
    try {
      await api.delete(`/usuarios/${id}`);
      setMensaje('✅ Usuario eliminado');
      cargarUsuarios();
    } catch (err) {
      setMensaje('❌ Error al eliminar el usuario');
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      await api.post('/usuarios', form);
      setMensaje('✅ Usuario creado correctamente');
      setForm({ username: '', password: '', role: 'CLIENTE' });
      cargarUsuarios();
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Error al crear el usuario';
      setMensaje(msg);
    }
  };

  const filtrados = usuarios.filter((u) =>
    u.username.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    verificarPermiso();
  }, []);

  useEffect(() => {
    if (permitido === true) cargarUsuarios();
    else if (permitido === false) navigate('/home');
  }, [permitido]);

  if (permitido === null) return <p className="text-center mt-5">Verificando permisos...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontWeight: 'bold', color: '#333' }}
        >
          👥 Administración de Usuarios
        </motion.h2>

        {mensaje && (
          <motion.div
            className="alert alert-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {mensaje}
          </motion.div>
        )}

        {/* Formulario Alta */}
        <motion.div
          className="card p-4 mb-4 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h5 className="mb-3">➕ Crear nuevo usuario</h5>
          <form onSubmit={crearUsuario}>
            <div className="row">
              <div className="col-md-4 mb-2">
                <input
                  className="form-control"
                  placeholder="Usuario"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3 mb-2">
                <select
                  className="form-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="CLIENTE">CLIENTE</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="col-md-2 mb-2 text-end">
                <button type="submit" className="btn btn-primary w-100">
                  <FaPlus className="me-1" /> Crear
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Buscador */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="🔍 Buscar usuario por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Tabla */}
        <motion.table
          className="table table-bordered table-hover shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="table-dark">
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u) => (
              <motion.tr key={u._id} whileHover={{ scale: 1.01 }}>
                <td>
                  {editandoId === u._id ? (
                    <input
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    u.username
                  )}
                </td>
                <td>
                  {editandoId === u._id ? (
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="form-select"
                    >
                      <option value="CLIENTE">CLIENTE</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    <span
                      className={`badge ${u.role === 'ADMIN' ? 'bg-success' : 'bg-secondary'}`}
                    >
                      {u.role}
                    </span>
                  )}
                </td>
                <td>
                  {editandoId === u._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={guardar}>
                        <FaSave />
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={cancelar}>
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => editar(u)}>
                        <FaUserEdit />
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(u._id)}>
                        <FaTrashAlt />
                      </button>
                    </>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </>
  );
};

export default UsuariosAdmin;
