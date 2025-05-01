import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselRecetas = () => {
  return (
    <div style={{ width: '100vw' }}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrousel/carrousel1.jpg"
            alt="Primera receta"
            style={{ maxHeight: '600px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrousel/carrousel2.jpg"
            alt="Primera receta"
            style={{ maxHeight: '600px', objectFit: 'cover' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carrousel/carrousel3.jpg"
            alt="Primera receta"
            style={{ maxHeight: '600px', objectFit: 'cover' }}
          />
        </Carousel.Item>


        {/* Podés agregar más slides acá */}
      </Carousel>
    </div>
  );
};

export default CarouselRecetas;
