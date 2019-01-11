import {Typography} from '@material-ui/core';
import * as React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <Typography style={{margin: 10}} gutterBottom={true} align="left">
        {`Version 1.0`}
      </Typography>
    );
  }
}

export {Footer};
