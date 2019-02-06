import {PaletteType} from '@material-ui/core';
import React, {ContextType, Provider, useState} from 'react';
import AppTheme from './AppTheme';

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

interface State {
  theme: PaletteType;
}

const AppProvider = ({children}: React.Props<Context>) => {
  const [theme, setTheme] = useState(AppTheme.getTheme());
  return (
    <AppContext.Provider
      value={{
        action: {
          switchTheme: (name: PaletteType) => {
            setTheme(name);
            AppTheme.setTheme(name);
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
