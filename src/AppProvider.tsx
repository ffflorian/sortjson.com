import {PaletteType} from '@material-ui/core';
import React, {useState} from 'react';
import {loadTheme, saveTheme} from './AppTheme';

interface State {
  theme: PaletteType;
}
interface Context {
  action: {
    switchTheme: () => void;
  };
  state: State;
}

const AppContext = React.createContext<Context>({
  action: {
    switchTheme: () => {},
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
          switchTheme: () => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            saveTheme(newTheme);
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
