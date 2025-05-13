import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#222', color: '#fff', padding: '2rem 0', marginTop: '4rem' }}>
      <div className="container text-center">
        <h5 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', marginBottom: '1rem' }}>
          ROCCETAS 🍳
        </h5>
        <p style={{ marginBottom: '0.5rem' }}>Recetas caseras hechas con amor.</p>
        <p style={{ fontSize: '0.9rem', color: '#aaa' }}>© {new Date().getFullYear()} Todos los derechos reservados.</p>
        <div style={{ marginTop: '1rem' }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ margin: '0 0.5rem', color: '#ffc107' }}>
            Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ margin: '0 0.5rem', color: '#ffc107' }}>
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
