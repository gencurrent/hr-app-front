import { createTheme } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';


const lightTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: deepOrange[500],
      main: deepOrange[500],
      dark: deepOrange[500]
    },
    error: {
      light: red[500],
      main: red[500],
      dark: red[500]
    },
    secondary: {
      main: deepOrange[200]
    },
    background: {
      main: '#202020'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: deepOrange[500],
      main: deepOrange[500],
      dark: deepOrange[500]
    },
    error: {
      light: red[500],
      main: red[500],
      dark: red[500]
    },
    secondary: {
      main: deepOrange[200]
    },
    background: {
      main: '#202020'
    }
  }
});

export {
  lightTheme,
  darkTheme
};