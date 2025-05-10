import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselRecetas = () => {
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  };

  const imgStyle = {
    width: '100%',
    height: '450px',
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
