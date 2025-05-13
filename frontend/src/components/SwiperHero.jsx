import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Autoplay, EffectFade } from 'swiper/modules';

const SwiperHero = () => {
  const slides = [
    '/images/carrousel/carrousel1.jpg',
    '/images/carrousel/carrousel2.jpg',
    '/images/carrousel/carrousel3.jpg',
  ];

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className="mySwiper"
      style={{ width: '100vw', height: '900px' }}
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt={`Slide ${i}`}
            style={{
              width: '100%',
              height: '900px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperHero;
