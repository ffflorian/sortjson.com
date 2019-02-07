import {CssBaseline, MuiThemeProvider, PaletteType, createMuiTheme} from '@material-ui/core';
import {MuiThemeProviderProps} from '@material-ui/core/styles/MuiThemeProvider';
import React, {useContext} from 'react';
import {ThemeContext} from './ThemeProvider';

const hasLocalStorage = () => typeof localStorage !== 'undefined';

export const loadTheme = (): PaletteType => {
  const theme = hasLocalStorage() && localStorage.getItem('theme');
  return theme === 'dark' ? 'dark' : 'light';
};

export const saveTheme = (name: PaletteType) => {
  if (hasLocalStorage()) {
    localStorage.setItem('theme', name);
  }
};

export const AppTheme = ({children}: React.Props<MuiThemeProviderProps>) => {
  const {theme} = useContext(ThemeContext);
  return (
    <MuiThemeProvider
      theme={createMuiTheme({
        palette: {
          type: theme,
        },
        typography: {
          useNextVariants: true,
        },
      })}
    >
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default AppTheme;
