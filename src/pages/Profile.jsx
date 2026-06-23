import React, { useContext, useRef, useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import AuthContext, { FIREBASE_API_KEY } from '../store/auth-context';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Route Guard: redirect to login/signup page if user is not authenticated
  if (!authCtx.isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const enteredNewPassword = newPasswordRef.current.value.trim();

    if (enteredNewPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data && data.error && data.error.message
          ? `Password change failed: ${data.error.message}`
          : 'Password change failed!';
        throw new Error(errorMsg);
      }

      setSuccess('Password changed successfully!');
      
      // Update session token in context with the newly returned secure token
      if (data && data.idToken) {
        authCtx.login(data.idToken);
      }

      // Reset the password input field
      newPasswordRef.current.value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-content py-5">
      <Container>
        <div className="section-title-container mb-5">
          <h2 className="section-title">USER PROFILE</h2>
          <div className="section-title-line"></div>
        </div>

        <div className="profile-card-container d-flex flex-column gap-4 align-items-center">
          {/* Profile Welcome Card */}
          <Card className="premium-product-card p-4 text-center" style={{ maxWidth: '600px', width: '100%' }}>
            <Card.Body>
              <h3 className="text-light mb-4">Welcome to your Profile!</h3>
              <p className="text-muted mb-4">
                You are securely logged in to your account.
              </p>
              <div className="text-accent-gold fw-bold mb-2">Active Session Token:</div>
              <div className="token-display bg-dark p-3 rounded" style={{ fontSize: '0.85rem', wordBreak: 'break-all', maxHeight: '100px', overflowY: 'auto', color: 'var(--primary)' }}>
                {authCtx.token}
              </div>
            </Card.Body>
          </Card>

          {/* Change Password Card */}
          <Card className="premium-product-card p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <Card.Body>
              <h3 className="text-light mb-4 text-center">Change Password</h3>
              
              {error && (
                <Alert variant="danger" className="mb-4 text-center">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="mb-4 text-center">
                  {success}
                </Alert>
              )}

              <form onSubmit={changePasswordHandler} className="auth-form">
                <div className="form-group mb-4">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    type="password"
                    id="new-password"
                    ref={newPasswordRef}
                    required
                    placeholder="Enter new password"
                  />
                </div>

                <div className="text-center">
                  {isLoading ? (
                    <div className="auth-spinner-container">
                      <div className="auth-spinner"></div>
                    </div>
                  ) : (
                    <button type="submit" className="auth-btn w-100">
                      Change Password
                    </button>
                  )}
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </main>
  );
};

export default Profile;
