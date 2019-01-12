import * as React from 'react';

interface Props {}

interface State {
  inDarkMode: boolean;
}

interface Store {
  state: State;
}

const AppContext = React.createContext<Store>({
  state: {
    inDarkMode: false,
  },
});

class AppContextProvider extends React.Component<Props, State> {
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
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export {AppContextProvider};
