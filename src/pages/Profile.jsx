import React, { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Profile = () => {
  const authCtx = useContext(AuthContext);

  // Route Guard: redirect to login/signup page if user is not authenticated
  if (!authCtx.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <main className="main-content py-5">
      <Container>
        <div className="section-title-container mb-5">
          <h2 className="section-title">USER PROFILE</h2>
          <div className="section-title-line"></div>
        </div>

        <div className="profile-card-container">
          <Card className="premium-product-card p-4 text-center">
            <Card.Body>
              <h3 className="text-light mb-4">Welcome to your Profile!</h3>
              <p className="text-muted mb-4">
                You are securely logged in to your account.
              </p>
              <div className="text-accent-gold fw-bold mb-2">Active Session Token:</div>
              <div className="token-display bg-dark p-3 rounded" style={{ fontSize: '0.85rem', wordBreak: 'break-all', maxHeight: '150px', overflowY: 'auto', color: 'var(--primary)' }}>
                {authCtx.token}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </main>
  );
};

export default Profile;
