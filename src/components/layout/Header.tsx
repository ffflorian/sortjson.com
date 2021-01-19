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
import {Github as GithubCircle} from 'mdi-material-ui';
import React, {useContext} from 'react';

import {ThemeContext} from '../../ThemeProvider';
import {Logo} from './Logo';

const styles = () =>
  createStyles({
    appBarWrapper: {
      flexGrow: 1,
    },
    darkModeControl: {
      userSelect: 'none',
    },
    formGroup: {
      alignItems: 'center',
      padding: '0 16px',
    },
    title: {
      lineHeight: 2,
      paddingLeft: 16,
    },
    version: {
      flexGrow: 1,
      fontSize: '.75rem',
      lineHeight: 3,
      marginBottom: '.75rem',
      marginLeft: 8,
      opacity: 0.5,
    },
  });

interface Props extends WithStyles<typeof styles> {}

const version = process.env.REACT_APP_VERSION || '';
const Header = ({classes}: Props) => {
  const {theme, switchTheme} = useContext(ThemeContext);
  const inDarkMode = theme === 'dark';

  return (
    <div className={classes.appBarWrapper}>
      <AppBar color="default" position="static">
        <FormControl>
          <FormGroup row className={classes.formGroup}>
            <Logo size={32} />
            <Typography className={classes.title} color="inherit" variant="h5">
              Sort JSON
            </Typography>
            <Typography className={classes.version} align="left" gutterBottom={true}>
              {version}
            </Typography>{' '}
            <FormControlLabel
              className={classes.darkModeControl}
              control={<Switch color="primary" checked={inDarkMode} onChange={switchTheme} />}
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
