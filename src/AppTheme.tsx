import {CssBaseline, MuiThemeProvider, PaletteType, createMuiTheme} from '@material-ui/core';
import * as React from 'react';
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
              palette: {
                type: context.state.theme,
              },
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
