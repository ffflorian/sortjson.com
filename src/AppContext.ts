import * as React from 'react';

interface Context {
  state: {
    inDarkMode: boolean;
  };
}

const AppContext = React.createContext<Context>({
  state: {
    inDarkMode: false,
  },
});

export default AppContext;
