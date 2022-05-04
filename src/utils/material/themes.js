
import { createTheme } from '@mui/material';
import { deepOrange, red } from '@mui/material/colors';


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

export {
  lightTheme,
  darkTheme,
};