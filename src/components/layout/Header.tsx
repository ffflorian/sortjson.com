import {
  AppBar,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  Theme,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    AppBarWrapper: {
      flexGrow: 1,
    },
    Title: {
      flexGrow: 1,
      lineHeight: '48px',
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  inDarkMode: boolean;
}

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inDarkMode: false,
    };
  }

  handleChange = (event: React.ChangeEvent) => {
    this.setState({inDarkMode: !this.state.inDarkMode});
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.AppBarWrapper}>
        <AppBar color="default" position="static">
          <FormControl>
            <FormGroup row>
              <Typography className={classes.Title} color="inherit" variant="h5">
                Sort JSON
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.inDarkMode}
                    onChange={this.handleChange}
                    value="inDarkMode"
                  />
                }
                label="Dark Mode"
              />
            </FormGroup>
          </FormControl>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
