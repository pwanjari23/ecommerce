import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const Hero = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <section className="premium-hero">
      <Container>
        <h1 className="hero-title">The Generics</h1>
        {isHomePage ? (
          <div className="hero-promo-container mt-4">
            <button className="promo-album-btn mb-3" type="button">
              Get our Latest Album
            </button>
            <br />
            <button className="promo-play-btn" type="button" aria-label="Play Album">
              <FaPlay />
            </button>
          </div>
        ) : (
          <p className="hero-subtitle">The Ultimate Sound Experience</p>
        )}
      </Container>
    </section>
  );
};

export default Hero;
