import {CssBaseline, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {MuiThemeProviderProps} from '@material-ui/core/styles/MuiThemeProvider';
import React, {useContext} from 'react';

import {ThemeContext} from './ThemeProvider';

export const AppTheme = ({children}: React.Props<MuiThemeProviderProps>) => {
  const {theme} = useContext(ThemeContext);
  return (
    <MuiThemeProvider
      theme={createMuiTheme({
        overrides: {
          MuiInput: {
            root: {
              borderRadius: 4,
            },
            underline: {
              '&:after, &:before': {
                display: 'none',
              },
            },
          },
        },
        palette: {
          type: theme,
        },
        spacing: {unit: 16},
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
