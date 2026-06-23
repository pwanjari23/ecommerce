import React, { useContext } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import CartContext from '../store/cart-context';

const Header = ({ onCartClick }) => {
  const cartCtx = useContext(CartContext);

  // Calculate cartCount dynamically from the global context
  const cartCount = cartCtx.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" className="premium-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/store" className="premium-brand">
          The Generics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom" end>HOME</Nav.Link>
            <Nav.Link as={NavLink} to="/store" className="nav-link-custom">STORE</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-custom">ABOUT</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link-custom">CONTACT US</Nav.Link>
            <Nav.Link as={NavLink} to="/movies" className="nav-link-custom">MOVIES</Nav.Link>
            <Nav.Link as={NavLink} to="/auth" className="nav-link-custom">LOGIN</Nav.Link>
          </Nav>
          <Nav>
            <button className="cart-btn-premium" onClick={onCartClick} type="button">
              <FiShoppingCart size={18} />
              <span>Cart</span>
              <Badge className="cart-badge">{cartCount}</Badge>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
