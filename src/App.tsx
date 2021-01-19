import React from 'react';

import {AppTheme} from './AppTheme';
import {Content, Header} from './components/layout/';
import {ThemeProvider} from './ThemeProvider';

const App = () => (
  <ThemeProvider>
    <AppTheme>
      <Header />
      <Content />
    </AppTheme>
  </ThemeProvider>
);

export default App;
