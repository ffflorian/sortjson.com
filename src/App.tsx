import {MuiThemeProvider} from '@material-ui/core';
import * as React from 'react';
import {Content, Footer, Header} from './components/layout/';
import {DarkTheme} from './Themes';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={DarkTheme}>
        <Header />
        <Content />
        <Footer />
      </MuiThemeProvider>
    );
  }
}

export default App;
