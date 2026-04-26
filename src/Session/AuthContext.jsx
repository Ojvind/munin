import React, {
  createContext, useContext, useState, useEffect, useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem('token'));

  const setToken = useCallback((newToken) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem('token');
    setTokenState(null);
  }, []);

  useEffect(() => {
    const handleAuthError = () => removeToken();
    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, [removeToken]);

  const contextValue = useMemo(
    () => ({ token, setToken, removeToken }),
    [token, setToken, removeToken],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
