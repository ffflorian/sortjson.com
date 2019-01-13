import {CssBaseline, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
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

export default Theme;
