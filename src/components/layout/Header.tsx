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
      flexGrow: 1,
      lineHeight: '48px',
      paddingLeft: '20px',
    },
  });

interface Props extends WithStyles<typeof styles> {}

const Header = ({classes}: Props) => {
  const {state, action} = useContext(AppContext);
  const inDarkMode = state.theme === 'dark';

  return (
    <div className={classes.AppBarWrapper}>
      <AppBar color="default" position="static">
        <FormControl>
          <FormGroup row>
            <Typography className={classes.Title} color="inherit" variant="h5">
              Sort JSON
            </Typography>
            <FormControlLabel
              className={classes.DarkModeControl}
              control={<Switch color="primary" checked={inDarkMode} onChange={action.switchTheme} />}
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
