import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import * as React from 'react';
import {Content, Footer, Header} from './components/layout/';

const AppContext = React.createContext({
  state: {
    inDarkMode: false,
  },
});

interface Context {
  state: State;
}

interface Props {}

interface State {
  inDarkMode: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inDarkMode: true,
    };
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
        }}
      >
        <AppContext.Consumer>
          {(context: Context) => (
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
              <Header />
              <Content />
              <Footer />
            </MuiThemeProvider>
          )}
        </AppContext.Consumer>
      </AppContext.Provider>
    );
  }
}

export default App;
