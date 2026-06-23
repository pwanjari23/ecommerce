import React, { useState, useEffect } from 'react';
import { FIREBASE_API_KEY } from '../pages/Auth';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

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
          // Keep the session if it's just a network/connection error,
          // but logout if the server returned a 400 (which is caught by !response.ok).
        }
      };

      verifyToken();
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
