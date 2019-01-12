import * as React from 'react';

interface Context {
  action: {
    switchTheme: () => void;
  };
  state: {
    inDarkMode: boolean;
  };
}

const AppContext = React.createContext<Context>({
  action: {
    switchTheme: () => {},
  },
  state: {
    inDarkMode: false,
  },
});

interface Props {}

interface State {
  inDarkMode: boolean;
}

class AppProvider extends React.Component<Props, State> {
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
          action: {
            switchTheme: () =>
              this.setState({
                inDarkMode: !this.state.inDarkMode,
              }),
          },
          state: this.state,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export {AppContext, AppProvider};
