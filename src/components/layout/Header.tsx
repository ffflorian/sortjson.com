import {
  AppBar,
  FormControlLabel,
  Switch,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    root: {
      flexGrow: 1,
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" color="inherit" className={classes.grow}>
              Sort JSON
            </Typography>
            <FormControlLabel control={<Switch checked={true} value="hidden" color="primary" />} label="Hidden" />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
