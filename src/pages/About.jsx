import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <main className="main-content py-5">
      <Container>
        {/* Section Header */}
        <div className="section-title-container mb-5">
          <h2 className="section-title">ABOUT</h2>
          <div className="section-title-line"></div>
        </div>

        {/* Content Row */}
        <Row className="align-items-center justify-content-center">
          <Col lg={5} className="mb-4 mb-lg-0 text-center">
            <div className="about-img-frame">
              <img 
                src="https://prasadyash2411.github.io/ecom-website/img/Band%20Members.png" 
                alt="The Generics Band Members" 
                className="about-img img-fluid"
              />
            </div>
          </Col>
          <Col lg={7}>
            <div className="about-text-container ps-lg-4">
              <h3 className="about-subtitle mb-4">The Story of The Generics</h3>
              <p className="about-paragraph">
                Lorem ipsum carrots enhanced rebates. Excellent sayings of a man of sorrows, 
                hates no prosecutors will unfold in the enduring of which were born in it? 
                Often leads to the smallest mistake some pain; main responsibilities are to stand for 
                the right builder of pleasure, accepted explain up to now.
              </p>
              <p className="about-paragraph">
                The things we are accusing of these in the explication of the truth receives from the 
                flattery of her will never be the trouble and they are refused to the pleasures and 
                charities of life. Guided by the rhythm and driven by passion, The Generics have been 
                transforming ambient soundscapes and retro-classic rock since their inception.
              </p>
              <p className="about-paragraph">
                With gold records, international tours, and a deep dedication to auditory excellence, 
                this project serves as the official digital storefront for albums, merchandise, and 
                exclusive tour offerings. Thank you for supporting true independent sound.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default About;
