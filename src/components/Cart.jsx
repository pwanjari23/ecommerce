import React, { useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';
import CartContext from '../store/cart-context';

const Cart = ({ show, handleClose }) => {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items;

  // Calculate total price dynamically
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePurchase = () => {
    alert('Thank you for your purchase!');
    cartCtx.clearCart();
    handleClose();
  };

  return (
    <Offcanvas 
      show={show} 
      onHide={handleClose} 
      placement="end" 
      className="premium-cart-offcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <div className="cart-empty-message">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            {/* Headers */}
            <div className="cart-header-row">
              <span style={{ flex: 2 }}>Item</span>
              <span style={{ flex: 1, textAlign: 'center' }}>Price</span>
              <span style={{ flex: 1.5, textAlign: 'right' }}>Quantity</span>
            </div>

            {/* Cart Items List */}
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-row">
                <div className="cart-col-item">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="cart-item-thumb" 
                  />
                  <span className="cart-item-name" title={item.title}>
                    {item.title}
                  </span>
                </div>
                
                <div className="cart-col-price">
                  ${item.price}
                </div>
                
                <div className="cart-col-quantity">
                  <span className="cart-quantity-badge">{item.quantity}</span>
                  <button 
                    className="cart-item-remove-btn"
                    onClick={() => cartCtx.removeItem(item.title)}
                    type="button"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}

            {/* Summary Total */}
            <div className="cart-total-container">
              <span className="cart-total-lbl">Total</span>
              <span className="cart-total-val">${totalPrice}</span>
            </div>

            {/* Purchase button */}
            <button 
              className="cart-checkout-btn"
              onClick={handlePurchase}
              type="button"
            >
              PURCHASE
            </button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
