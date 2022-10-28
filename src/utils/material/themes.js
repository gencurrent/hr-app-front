import { createTheme } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";

const primary = "#7C9DC4";
const secondary = "#DCE6F1";
const error = "#CE7D7D";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: grey[800],
      secondary: grey[600],
      mainbar: grey[50],
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      secondary: grey[200],
    },
    background: {
      default: grey[50],
    },
    error: {
      main: error,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: grey[50],
      secondary: grey[50],
      mainbar: grey[50],
    },
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: grey[50],
    },
  },
});

export { lightTheme, darkTheme };
