import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselRecetas = () => {
  const containerStyle = {
    width: '100vw',          // 👉 ancho completo de la ventana
    height: '100%',          // altura automática
    overflow: 'hidden',
    borderRadius: 0,         // sin bordes redondeados
  };

  const imgStyle = {
    width: '100%',
    height: '500px',         // ajustá la altura según tu diseño
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <div style={containerStyle}>
      <Carousel fade interval={4000}>
        <Carousel.Item>
          <img
            style={imgStyle}
            src="/images/carrousel/carrousel1.jpg"
            alt="Receta 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imgStyle}
            src="/images/carrousel/carrousel2.jpg"
            alt="Receta 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imgStyle}
            src="/images/carrousel/carrousel3.jpg"
            alt="Receta 3"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselRecetas;
