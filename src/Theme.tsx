import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import * as React from 'react';
import {AppContext} from './AppProvider';

class Theme extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <MuiThemeProvider
            theme={createMuiTheme({
              palette: {
                type: context.state.inDarkMode ? 'dark' : 'light',
              },
              typography: {
                useNextVariants: true,
              },
            })}
          >
            {this.props.children}
          </MuiThemeProvider>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Theme;
