import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { Spinner } from 'react-bootstrap';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store'));
const About = lazy(() => import('./pages/About'));
const Movies = lazy(() => import('./pages/Movies'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleToggleCart = () => setShowCart(prev => !prev);

  return (
    <>
      {/* Premium Top Navigation */}
      <Header onCartClick={handleToggleCart} />

      {/* Styled Brand Banner */}
      <Hero />

      {/* Dynamic Page Views based on URL Path with Suspense for Lazy Loading */}
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" style={{ color: 'var(--primary)', width: '3rem', height: '3rem' }} />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>

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
