import React, { useRef, useState, useContext } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext, { FIREBASE_API_KEY } from '../store/auth-context';

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
    setError(null);
    setSuccess(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const enteredEmail = emailRef.current.value.trim();
    const enteredPassword = passwordRef.current.value.trim();
    
    let enteredConfirmPassword = '';
    if (!isLogin) {
      enteredConfirmPassword = confirmPasswordRef.current.value.trim();
      if (enteredPassword !== enteredConfirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }
    }

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data && data.error && data.error.message 
          ? `Authentication failed: ${data.error.message}` 
          : 'Authentication failed!';
        throw new Error(errorMsg);
      }

      setSuccess(true);
      
      // Log the JWT token and store it in context
      if (data && data.idToken) {
        console.log('idToken:', data.idToken);
        authCtx.login(data.idToken);
        // Redirect to products/store page after 1 second
        setTimeout(() => {
          navigate('/store');
        }, 1000);
      }
      
      // Clear input fields
      emailRef.current.value = '';
      passwordRef.current.value = '';
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.value = '';
      }
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
          <h2 className="section-title">{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>
          <div className="section-title-line"></div>
        </div>

        <div className="auth-card">
          {error && (
            <Alert variant="danger" className="mb-4 text-center">
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="mb-4 text-center">
              {isLogin ? 'Login successful!' : 'Account created successfully!'}
            </Alert>
          )}

          <form onSubmit={submitHandler} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                required
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  ref={confirmPasswordRef}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <div className="text-center mb-3">
              {isLoading ? (
                <div className="auth-spinner-container">
                  <div className="auth-spinner"></div>
                </div>
              ) : (
                <button type="submit" className="auth-btn">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              )}
            </div>

            {/* Hiding switch mode button as signup page is not needed */}
            {/* <div className="text-center">
              <button 
                type="button" 
                className="btn-switch-auth" 
                onClick={switchAuthModeHandler}
              >
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
            </div> */}
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Auth;
