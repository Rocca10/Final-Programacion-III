import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            {/* Navbar fija arriba y full width */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
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
                                    <li><a className="dropdown-item" href="#">Ver Recetas</a></li>
                                    <li><a className="dropdown-item" href="#">Crear Receta</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar sesión</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* ACA CENTRO TODO EL CONTENIDO */}
            <div
                style={{
                    marginTop: '56px',
                    minHeight: 'calc(100vh - 56px)',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0 1rem', // para evitar que el texto toque los bordes en pantallas chicas
                }}
            >
                <h1 className="display-4 fw-bold">Bienvenido a ROCCETAS 👨‍🍳</h1>
                <p className="lead">Desde aquí vas a poder explorar, crear y compartir tus recetas favoritas.</p>
            </div>

        </>
    );
};

export default Home;
