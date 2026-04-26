import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { themes } from '../styles/theme';
import { useThemeContext } from '../contexts/ThemeContext';

const ThemeProvider = ({ children }) => {
  const { themeName } = useThemeContext();
  const theme = themes[themeName] || themes.earth;

  useEffect(() => {
    document.body.dataset.theme = themeName;
  }, [themeName]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
