import React from 'react';
import {AppProvider} from './AppProvider';
import AppTheme from './AppTheme';
import {Content, Footer, Header} from './components/layout/';

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <AppTheme>
          <Header />
          <Content classes={gridClasses} />
        </AppTheme>
      </AppProvider>
    );
  }
}

const gridClasses = {};

export default App;
