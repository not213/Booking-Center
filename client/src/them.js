// import {colors} from '@material-ui/core';
// import {createTheme} from '@material-ui/core/styles';

import {colors, createTheme} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Prompt',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    background: {
      // dark: colors.grey[200],
      white: '#F0F4FF',
      main: '#C5E5DA',
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: '#6EAE96',
    },
    secondary: {
      main: colors.red[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      white: '#F0F4FF',
    },
  },
});

export default theme;
