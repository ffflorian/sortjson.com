import {createMuiTheme} from '@material-ui/core/styles';

const DarkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

export {DarkTheme};
