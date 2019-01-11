import * as React from 'react';
import {Footer, Header} from './components/layout/';
import Content from './components/layout/Content';

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
