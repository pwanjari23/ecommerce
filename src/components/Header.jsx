import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="md" variant="dark" className="premium-navbar" sticky="top">
      <Container>
        <Navbar.Brand href="#" className="premium-brand">
          The Generics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#" className="nav-link-custom">HOME</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom active">STORE</Nav.Link>
            <Nav.Link href="#" className="nav-link-custom">ABOUT</Nav.Link>
          </Nav>
          <Nav>
            <button className="cart-btn-premium">
              <FiShoppingCart size={18} />
              <span>Cart</span>
              <Badge className="cart-badge">0</Badge>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
