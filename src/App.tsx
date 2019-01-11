import * as React from 'react';
import {Content, Footer, Header} from './components/layout/';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Content />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
