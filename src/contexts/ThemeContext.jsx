import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(
    () => localStorage.getItem('theme') || 'earth',
  );

  const selectTheme = (name) => {
    localStorage.setItem('theme', name);
    setThemeName(name);
  };

  const value = useMemo(() => ({ themeName, selectTheme }), [themeName, selectTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
