import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AuthContext from '../store/auth-context';

export const productsArr = [
  {
    id: 'p1',
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80',
      'https://images.unsplash.com/photo-1507908708918-778587c9e563?w=600&q=80'
    ],
    reviews: [
      { id: 'r1', user: 'Alice Smith', rating: 5, comment: 'Vibrant colors and excellent sound quality!' },
      { id: 'r2', user: 'Bob Johnson', rating: 4, comment: 'Beautiful album art, sounds great on vinyl.' }
    ]
  },
  {
    id: 'p2',
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=600&q=80',
      'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=600&q=80'
    ],
    reviews: [
      { id: 'r1', user: 'Charlie Brown', rating: 5, comment: 'A timeless classic. Highly recommended.' },
      { id: 'r2', user: 'Diana Prince', rating: 4, comment: 'Nice production quality, very satisfying compilation.' }
    ]
  },
  {
    id: 'p3',
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80'
    ],
    reviews: [
      { id: 'r1', user: 'Ethan Hunt', rating: 5, comment: 'Dynamic tracks, energetic album vibes!' }
    ]
  },
  {
    id: 'p4',
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=600&q=80'
    ],
    reviews: [
      { id: 'r1', user: 'Fiona Gallagher', rating: 5, comment: 'Amazing atmospheric tunes. Absolutely love the blue theme.' },
      { id: 'r2', user: 'George Clark', rating: 3, comment: 'Good music, but shipping took a bit longer than expected.' }
    ]
  }
];

const Store = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <main className="main-content py-5">
      <Container>
        {/* Section Header */}
        <div className="section-title-container">
          <h2 className="section-title">MUSIC</h2>
          <div className="section-title-line"></div>
        </div>

        {/* Grid Layout for Products */}
        <Row className="justify-content-center">
          {productsArr.map((product) => (
            <Col 
              key={product.id} 
              xs={12} 
              sm={6} 
              lg={3} 
              className="d-flex justify-content-center align-items-stretch"
            >
              <ProductCard 
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default Store;
