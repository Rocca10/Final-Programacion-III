import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaUtensils, FaListUl, FaUserCog, FaHome } from 'react-icons/fa';

const esAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'ADMIN';
  } catch {
    return false;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const admin = esAdmin();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm"
    >
      <div className="container-fluid px-4">
        {/* Logo y nombre */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/home">
          <img src="/logo-roccetas.png" alt="Logo" width="40" height="40" style={{ borderRadius: '50%' }} />
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#ffc107' }}>
            ROCCETAS
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menú desplegable */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <FaListUl className="me-1" />
                Menú
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                {/* Recetas */}
                <li><h6 className="dropdown-header"><FaUtensils className="me-1" /> Recetas</h6></li>
                <li><Link className="dropdown-item" to="/buscar-recetas">¿Qué puedo cocinar?</Link></li>
                <li><Link className="dropdown-item" to="/recetas">Ver Recetas</Link></li>
                <li><Link className="dropdown-item" to="/crear-receta">Crear Receta</Link></li>

                <li><hr className="dropdown-divider" /></li>

                {/* Ingredientes */}
                <li><h6 className="dropdown-header">🧂 Ingredientes</h6></li>
                <li><Link className="dropdown-item" to="/ingredientes">Ver Ingredientes</Link></li>

                {/* Admin */}
                {admin && (
                  <>
                    <li><hr className="dropdown-divider" /></li>
                    <li><h6 className="dropdown-header"><FaUserCog className="me-1" /> Administración</h6></li>
                    <li><Link className="dropdown-item" to="/admin/usuarios">Usuarios</Link></li>
                  </>
                )}

                <li><hr className="dropdown-divider" /></li>

                {/* Perfil y logout */}
                <li><Link className="dropdown-item" to="/perfil"><FaUserCircle className="me-1" /> Mi perfil</Link></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
