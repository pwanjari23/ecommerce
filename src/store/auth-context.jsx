import React, { useState, useEffect } from 'react';
import { FIREBASE_API_KEY } from '../pages/Auth';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  // Initialize token state based on expiration
  const [token, setToken] = useState(() => {
    const storedExpirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();
    if (storedExpirationTime && currentTime < parseInt(storedExpirationTime)) {
      return localStorage.getItem('token');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null;
    }
  });

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime.toString());
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  };

  // Effect for accounts:lookup validation
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
            {
              method: 'POST',
              body: JSON.stringify({
                idToken: token,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            // Token is invalid or expired
            logoutHandler();
          }
        } catch (err) {
          // Keep session if network is offline
        }
      };

      verifyToken();
    }
  }, [token]);

  // Effect for 5-minute auto-logout timer
  useEffect(() => {
    if (token) {
      const storedExpirationTime = localStorage.getItem('expirationTime');
      if (storedExpirationTime) {
        const remainingTime = parseInt(storedExpirationTime) - new Date().getTime();

        if (remainingTime <= 0) {
          logoutHandler();
        } else {
          const logoutTimer = setTimeout(() => {
            logoutHandler();
            alert('Session expired. Please log in again.');
          }, remainingTime);

          return () => clearTimeout(logoutTimer);
        }
      }
    }
  }, [token]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
