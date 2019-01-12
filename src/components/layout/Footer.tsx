import {Typography} from '@material-ui/core';
import * as React from 'react';

const version = process.env.REACT_APP_VERSION || '';

class Footer extends React.Component {
  render() {
    return (
      <Typography style={{margin: 10}} gutterBottom={true} align="left">
        {`Version ${version}`}
      </Typography>
    );
  }
}

export {Footer};
