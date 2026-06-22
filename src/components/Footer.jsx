import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaYoutube, FaSpotify, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="premium-footer">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="footer-brand-container">
            <div className="footer-brand">The Generics</div>
          </Col>
          <Col md={6}>
            <div className="footer-social-links">
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn youtube"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a 
                href="https://open.spotify.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn spotify"
                aria-label="Spotify"
              >
                <FaSpotify />
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn facebook"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
