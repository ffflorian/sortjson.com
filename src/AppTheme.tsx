import {CssBaseline, MuiThemeProvider, PaletteType, createMuiTheme} from '@material-ui/core';
import React from 'react';
import {AppContext} from './AppProvider';

class AppTheme extends React.Component {
  static getTheme(): PaletteType {
    if (typeof localStorage !== 'undefined') {
      const theme = localStorage.getItem('theme');
      return theme === 'light' ? 'light' : 'dark';
    } else {
      return 'light';
    }
  }

  static setTheme(name: PaletteType) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', name);
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
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
                type: context.state.theme,
              },
              spacing: {unit: 16},
              typography: {
                useNextVariants: true,
              },
            })}
          >
            <CssBaseline />
            {this.props.children}
          </MuiThemeProvider>
        )}
      </AppContext.Consumer>
    );
  }
}

export default AppTheme;
