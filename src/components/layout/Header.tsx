import {AppBar, Toolbar, Typography} from '@material-ui/core';
import * as React from 'react';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="headline" color="inherit">
            Sort JSON
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export {Header};
