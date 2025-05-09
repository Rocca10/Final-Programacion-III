import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/home">
          <img src="/logo-roccetas.png" alt="Logo" width="40" height="40" />
          ROCCETAS
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Menú
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/recetas">Ver Recetas</Link>
                <Link className="dropdown-item" to="/ingredientes">Ingredientes</Link>
                <Link className="dropdown-item" to="/crear-receta">Crear Receta</Link>
                <Link className="dropdown-item" to="/buscar-recetas">¿Qué puedo cocinar?</Link>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
