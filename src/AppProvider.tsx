import {PaletteType} from '@material-ui/core';
import React, {useState} from 'react';
import {loadTheme, saveTheme} from './AppTheme';

interface State {
  theme: PaletteType;
}
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

const AppProvider = ({children}: React.Props<Context>) => {
  const [theme, setTheme] = useState(loadTheme());
  return (
    <AppContext.Provider
      value={{
        action: {
          switchTheme: (name: PaletteType) => {
            setTheme(name);
            saveTheme(name);
          },
        },
        state: {theme},
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
