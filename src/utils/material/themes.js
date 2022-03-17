import { createTheme as createThemeOld } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';
import { createTheme } from '@mui/material';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#ff5722'
    },
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#f50057',
    },
  },
});



const darkThemeOld = createThemeOld({
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

const lightThemeOld = createThemeOld({
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
  darkTheme,
  lightThemeOld,
  darkThemeOld
};