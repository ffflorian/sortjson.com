import {createMuiTheme} from '@material-ui/core/styles';

const DarkTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

export {DarkTheme};
