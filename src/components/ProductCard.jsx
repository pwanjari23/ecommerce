import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartContext from '../store/cart-context';

const ProductCard = ({ id, title, price, imageUrl }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: id,
      title: title,
      price: price,
      imageUrl: imageUrl,
    });
  };

  return (
    <div className="product-card-wrapper h-100 mb-4">
      <Card className="premium-product-card">
        <Card.Body className="product-card-body">
          <Card.Title className="product-card-title text-center">
            <Link to={`/store/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="product-title-link">
              {title}
            </Link>
          </Card.Title>
          
          <Link to={`/store/${id}`}>
            <div className="product-image-container">
              <img src={imageUrl} alt={title} className="product-image" />
              <div className="product-image-overlay"></div>
            </div>
          </Link>
          
          <div className="product-card-footer">
            <div className="product-price">
              <span>$</span>{price}
            </div>
            <button 
              className="buy-btn-premium" 
              type="button"
              onClick={addToCartHandler}
            >
              ADD TO CART
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
