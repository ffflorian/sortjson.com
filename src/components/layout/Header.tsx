import {
  AppBar,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import {GithubCircle} from 'mdi-material-ui';
import React, {useContext} from 'react';
import {AppContext} from '../../AppProvider';

const styles = () =>
  createStyles({
    AppBarWrapper: {
      flexGrow: 1,
    },
    DarkModeControl: {
      userSelect: 'none',
    },
    Title: {
      lineHeight: 2,
      paddingLeft: '20px',
    },
    version: {
      flexGrow: 1,
      fontSize: '12px',
      lineHeight: 3,
      marginLeft: 8,
      opacity: 0.5,
    },
  });

interface Props extends WithStyles<typeof styles> {}

const version = process.env.REACT_APP_VERSION || '';
const Header = ({classes}: Props) => {
  const {state, action} = useContext(AppContext);
  const isDarkMode = state.theme === 'dark';
  return (
    <div className={classes.AppBarWrapper}>
      <AppBar color="default" position="static">
        <FormControl>
          <FormGroup row>
            <Typography className={classes.Title} color="inherit" variant="h5">
              Sort JSON
            </Typography>
            <Typography className={classes.version} align="left" gutterBottom={true}>
              {version}
            </Typography>
            <FormControlLabel
              className={classes.DarkModeControl}
              control={
                <Switch
                  color="primary"
                  checked={isDarkMode}
                  onChange={() => action.switchTheme(isDarkMode ? 'light' : 'dark')}
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
  );
};

export default withStyles(styles)(Header);
