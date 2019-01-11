import React, {Component, Fragment} from 'react';
import {Content, Footer, Header} from './components/layout/';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
