import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/PageHero.css';

const PageHero = ({ title, subtitle, bgImage, bgColor = 'primary', subtitleClassName = '', customStyles = {} }) => {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className={`page-hero bg-${bgColor}`} style={heroStyle}>
      <Container>
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && (
            <p 
              className={`hero-subtitle ${subtitleClassName}`} 
              style={customStyles}
            >
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageHero; 