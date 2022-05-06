
import { createTheme } from '@mui/material';
import {
  deepOrange,
  red,
  grey,
} from '@mui/material/colors';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: grey[800],
    },
    background: {
      default: grey[50],
    }
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