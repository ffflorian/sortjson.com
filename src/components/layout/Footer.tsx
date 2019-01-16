import {Theme, Typography, WithStyles, createStyles, withStyles} from '@material-ui/core';
import React from 'react';

const version = process.env.REACT_APP_VERSION || '';

const styles = (theme: Theme) =>
  createStyles({
    Imprint: {
      marginTop: '10px',
      paddingLeft: '20px',
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {}

class Footer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <Typography align="left" className={classes.Imprint} gutterBottom={true}>
        {`Version ${version}`}
      </Typography>
    );
  }
}

export default withStyles(styles)(Footer);
