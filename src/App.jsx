import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Cart from './components/Cart';

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

const cartElements = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
  }
];

function App() {
  const [cartItems, setCartItems] = useState(cartElements);
  const [showCart, setShowCart] = useState(false);

  // Handlers for cart interaction
  const handleToggleCart = () => setShowCart(prev => !prev);
  const handleRemoveItem = (title) => {
    setCartItems(prev => prev.filter(item => item.title !== title));
  };
  const handleClearCart = () => setCartItems([]);

  // Dynamically calculate total quantities for the navbar badge
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={handleToggleCart} />

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

      {/* Cart Offcanvas Drawer */}
      <Cart 
        show={showCart} 
        handleClose={handleToggleCart} 
        cartItems={cartItems} 
        onRemove={handleRemoveItem}
        onClear={handleClearCart}
      />

      <Footer />
    </>
  );
}

export default App;
