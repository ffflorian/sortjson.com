import {
  AppBar,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Theme,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import {GithubCircle} from 'mdi-material-ui';
import * as React from 'react';
import {AppContext} from '../../AppProvider';
import AppTheme from '../../AppTheme';

const styles = (theme: Theme) =>
  createStyles({
    AppBarWrapper: {
      flexGrow: 1,
    },
    DarkModeControl: {
      userSelect: 'none',
    },
    Title: {
      flexGrow: 1,
      lineHeight: '48px',
      paddingLeft: '20px',
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
      inDarkMode: AppTheme.getTheme() === 'dark',
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <AppContext.Consumer>
        {context => (
          <div className={classes.AppBarWrapper}>
            <AppBar color="default" position="static">
              <FormControl>
                <FormGroup row>
                  <Typography className={classes.Title} color="inherit" variant="h5">
                    Sort JSON
                  </Typography>
                  <FormControlLabel
                    className={classes.DarkModeControl}
                    control={
                      <Switch
                        color="primary"
                        checked={this.state.inDarkMode}
                        onChange={() => {
                          this.setState(
                            {
                              inDarkMode: !this.state.inDarkMode,
                            },
                            () => {
                              if (this.state.inDarkMode) {
                                context.action.switchTheme('dark');
                              } else {
                                context.action.switchTheme('light');
                              }
                            }
                          );
                        }}
                        value="inDarkMode"
                      />
                    }
                    label="Dark Mode"
                  />
                  <IconButton color="inherit" href="https://github.com/ffflorian/sortjson.com">
                    <GithubCircle />
                  </IconButton>
                </FormGroup>
              </FormControl>
            </AppBar>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default withStyles(styles)(Header);
