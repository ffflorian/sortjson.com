import {PaletteType} from '@material-ui/core';
import * as React from 'react';

interface Context {
  action: {
    switchTheme: (name: PaletteType) => void;
  };
  state: State;
}

const AppContext = React.createContext<Context>({
  action: {
    switchTheme: (name: PaletteType) => {},
  },
  state: {
    theme: 'light',
  },
});

interface Props {}

interface State {
  theme: PaletteType;
}

class AppProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theme: window.localStorage.getItem('theme') as PaletteType,
    };
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          action: {
            switchTheme: (name: PaletteType) =>
              this.setState(
                {
                  theme: name,
                },
                () => {
                  window.localStorage.setItem('theme', this.state.theme);
                }
              ),
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
