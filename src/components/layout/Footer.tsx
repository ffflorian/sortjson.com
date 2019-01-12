import {Typography} from '@material-ui/core';
import * as React from 'react';

const version = process.env.REACT_APP_VERSION || '';

class Footer extends React.Component {
  render() {
    return (
      <Typography align="left" gutterBottom={true} style={{margin: 10}}>
        {`Version ${version}`}
      </Typography>
    );
  }
}

export {Footer};
