import * as React from 'react';
import {AppProvider} from './AppProvider';
import {Content, Footer, Header} from './components/layout/';
import Theme from './Theme';

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <Theme>
          <Header />
          <Content />
          <Footer />
        </Theme>
      </AppProvider>
    );
  }
}

export default App;
