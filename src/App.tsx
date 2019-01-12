import * as React from 'react';
import AppContext from './AppContext';
import {Content, Footer, Header} from './components/layout/';
import Theme from './Theme';

interface Props {}

interface State {
  inDarkMode: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inDarkMode: false,
    };
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
        }}
      >
        <Theme>
          <Header />
          <Content />
          <Footer />
        </Theme>
        )}
      </AppContext.Provider>
    );
  }
}

export default App;
