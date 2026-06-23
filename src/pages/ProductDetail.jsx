import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { productsArr } from './Store';
import CartContext from '../store/cart-context';

const ProductDetail = () => {
  const { productId } = useParams();
  const cartCtx = useContext(CartContext);
  
  // Find the selected product in the array
  const product = productsArr.find((p) => p.id === productId);

  if (!product) {
    return (
      <main className="main-content py-5">
        <Container>
          <Alert variant="danger">
            Product not found. <Link to="/store" className="alert-link">Back to Store</Link>
          </Alert>
        </Container>
      </main>
    );
  }

  // Active image selection state
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);

  // Zoom positioning states
  const [zoomOrigin, setZoomOrigin] = useState('center center');
  const [zoomScale, setZoomScale] = useState(1);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setZoomScale(2.5); // Zoom scale magnification factor
  };

  const handleMouseLeave = () => {
    setZoomScale(1);
    setZoomOrigin('center center');
  };

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <main className="main-content py-5">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-4">
          <Link to="/store" className="back-link-custom">
            &larr; BACK TO STORE
          </Link>
        </div>

        <Row className="g-5">
          {/* Left Column: Image Gallery & Hover Zoom */}
          <Col xs={12} md={6}>
            <div 
              className="zoom-image-container mb-3"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={selectedImage} 
                alt={product.title} 
                className="zoom-image"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: zoomOrigin
                }}
              />
            </div>
            
            {/* Thumbnail Strip */}
            <div className="thumbnail-strip d-flex gap-2">
              {product.images && product.images.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-wrapper ${selectedImage === imgUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`${product.title} thumb ${idx}`} className="thumbnail-img" />
                </div>
              ))}
            </div>
          </Col>

          {/* Right Column: Title, Price, Add to Cart, Reviews */}
          <Col xs={12} md={6}>
            <div className="product-info-panel mb-5">
              <h2 className="product-title-detail mb-3">{product.title}</h2>
              <div className="product-price-detail mb-4">
                <span>$</span>{product.price}
              </div>
              <p className="product-description-detail mb-4">
                Experience high-fidelity sound, artistic premium casing, and dynamic quality tracks. 
                Move your mouse over the product image to inspect the finer visual details of the artwork.
              </p>
              <button 
                className="buy-btn-premium py-3 px-5 fs-5"
                onClick={addToCartHandler}
                type="button"
              >
                ADD TO CART
              </button>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h4 className="reviews-title mb-4">CUSTOMER REVIEWS</h4>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <Card key={review.id} className="review-card mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="review-user mb-0">{review.user}</h6>
                        <span className="review-rating text-accent-gold">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>
                      <Card.Text className="review-comment text-muted">
                        {review.comment}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-muted">No reviews yet for this product.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProductDetail;
