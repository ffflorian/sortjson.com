import {PaletteType} from '@material-ui/core';
import React, {useState} from 'react';
import {loadTheme, saveTheme} from './AppTheme';

interface Context {
  switchTheme: () => void;
  theme: PaletteType;
}

const ThemeContext = React.createContext<Context>({switchTheme: () => {}, theme: 'light'});

const ThemeProvider = ({children}: React.Props<Context>) => {
  const [theme, setTheme] = useState(loadTheme());

  const value = {
    switchTheme: () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      saveTheme(newTheme);
    },
    theme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export {ThemeContext, ThemeProvider};
