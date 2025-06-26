import React from 'react';
import './LogoCarousel.css';

const logos = [
  '/assets/logos/apple.png',
  '/assets/logos/samsung.png',
  '/assets/logos/puma.png',
  '/assets/logos/nike.png',
  '/assets/logos/lakme.png',
  '/assets/logos/apple.png',
  '/assets/logos/samsung.png',
  '/assets/logos/puma.png',
  '/assets/logos/nike.png',
  '/assets/logos/lakme.png',
  '/assets/logos/apple.png',
  '/assets/logos/samsung.png',
  '/assets/logos/puma.png',
  '/assets/logos/nike.png',
  '/assets/logos/lakme.png'
];

const LogoCarousel: React.FC = () => {
  return (
    <div className="logo-carousel-container">
      <div className="logo-carousel-track">
        {[...logos, ...logos].map((src, idx) => (
          <div className="logo-carousel-item" key={idx}>
            <img src={src} alt={`logo-${idx}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
