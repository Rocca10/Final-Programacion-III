import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CarouselRecetas from '../components/CarouselRecetas';


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
                                <Link className="dropdown-item" to="/recetas">Ver Recetas</Link>
                                <li><a className="dropdown-item" href="/ingredientes">Ingredientes</a></li>
                                <Link className="dropdown-item" to="/crear-receta">Crear Receta</Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar sesión</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div
  style={{
    paddingTop: '70px', // espacio para navbar
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // ya no lo centramos vertical porque hay más contenido
    alignItems: 'center',
    textAlign: 'center',
    paddingInline: '1rem',
  }}
>
  <h1 className="display-4 fw-bold mt-3">Bienvenido a ROCCETAS 👨‍🍳</h1>
  <p className="lead mb-4">Desde aquí vas a poder explorar, crear y compartir tus recetas favoritas.</p>

  {/* Carrusel debajo del texto */}
  <CarouselRecetas />
</div>


        </>
    );
};

export default Home;
