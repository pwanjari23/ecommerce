import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Cart from './components/Cart';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Movies from './pages/Movies';
import ContactUs from './pages/ContactUs';

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleToggleCart = () => setShowCart(prev => !prev);

  return (
    <>
      {/* Premium Top Navigation */}
      <Header onCartClick={handleToggleCart} />

      {/* Styled Brand Banner */}
      <Hero />

      {/* Dynamic Page Views based on URL Path */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>

      {/* Cart Offcanvas Drawer */}
      <Cart 
        show={showCart} 
        handleClose={handleToggleCart} 
      />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
