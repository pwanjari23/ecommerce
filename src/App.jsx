import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];

function App() {
  return (
    <>
      <Header />

      <Hero />

      <main className="main-content py-5">
        <Container>
          <div className="section-title-container">
            <h2 className="section-title">MUSIC</h2>
            <div className="section-title-line"></div>
          </div>

          <Row className="justify-content-center">
            {productsArr.map((product, index) => (
              <Col 
                key={index} 
                xs={12} 
                sm={6} 
                lg={3} 
                className="d-flex justify-content-center align-items-stretch"
              >
                <ProductCard 
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
