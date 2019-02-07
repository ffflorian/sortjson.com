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

  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  return <ThemeContext.Provider value={{switchTheme, theme}}>{children}</ThemeContext.Provider>;
};

export {ThemeContext, ThemeProvider};
