import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ title, price, imageUrl }) => {
  return (
    <div className="product-card-wrapper h-100 mb-4">
      <Card className="premium-product-card">
       
        <Card.Body className="product-card-body">
          <Card.Title className="product-card-title text-center">
            {title}
          </Card.Title>
          
          <div className="product-image-container">
            <img src={imageUrl} alt={title} className="product-image" />
            <div className="product-image-overlay"></div>
          </div>
          
          <div className="product-card-footer">
            <div className="product-price">
              <span>$</span>{price}
            </div>
            <button className="buy-btn-premium" type="button">
              ADD TO CART
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
