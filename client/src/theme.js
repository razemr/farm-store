import { createTheme } from '@material-ui/core/styles';

const palette = {
  primary: {
    light: '#af52bf',
    main: '#9c27b0',
    dark: '#6d1b7b',
  },
  secondary: {
    light: '#f73378',
    main: '#f50057',
    dark: '#ab003c',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
  },
  warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
  },
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
  },
  inactive: {
    light: '#e0e0e0',
    main: '#bdbdbd',
    dark: '#9e9e9e'
  },
  background: {
    paper: '#fff',
    default: '#eee',
    level2: '#f5f5f5',
    level1: '#fff',
  },
  text: {
    disabled: '#a9afbb',
  },
};
const fontFamily = 'Roboto,Helvetica,Arial,sans-serif';
const boxShadowBase = '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px';

export const theme = createTheme({
  typography: {
    h1: {
      fontFamily,
      fontWeight: '300',
      fontSize: '3em',
      lineHeight: '1.15em',
    },
    h2: {
      fontFamily,
      fontWeight: '300',
      fontSize: '2.6em',
      lineHeight: '1.5em',
    },
    h3: {
      fontFamily,
      fontWeight: '300',
      fontSize: '1.825em',
      lineHeight: '1.4em',
      
    },
    h4: {
      fontFamily,
      fontWeight: '300',
      fontSize: '1.3em',
      lineHeight: '1.4em',
      
    },
    h5: {
      fontFamily,
      fontWeight: '300',
      fontSize: '1.25em',
      lineHeight: '1.4em'
    },
    h6: {
      fontFamily,
      fontWeight: '500',
      fontSize: '.8em',
      lineHeight: '1.5em',
      textTransform: 'uppercase;',
    },
    paragraph: {
      fontFamily,
      fontWeight: '300',
      fontSize: '.875rem',
      lineHeight: '1.5em',
    },
    subtitle1: {
      fontFamily,
      fontWeight: '300',
      lineHeight: '1.5em',
      fontSize: '.875rem',
    },
    body1: {
      fontFamily,
      fontWeight: '300',
      lineHeight: '1.5em',
      fontSize: '.875rem',
    },
    caption: {
      fontFamily,
      fontWeight: '300',
      fontSize: '12px',
      lineHeight: '22px',
    },
  },
  palette: palette,
  shadows: [
    '0 1px 4px 0 rgb(0 0 0 / 14%);',
    '0 1px 4px 0 rgb(0 0 0 / 14%);',
    '0 16px 38px -12px rgb(0 0 0 / 56%), 0 4px 25px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
  ],
  customShadows: {
    primary: `${boxShadowBase} ${palette.primary.dark}40`,
    secondary: `${boxShadowBase} ${palette.secondary.dark}40`,
    info: `${boxShadowBase} ${palette.info.dark}40`,
    error: `${boxShadowBase} ${palette.error.dark}40`,
    warning: `${boxShadowBase} ${palette.warning.dark}40`,
    success: `${boxShadowBase} ${palette.success.dark}40`,
    inactive: `${boxShadowBase} ${palette.inactive.dark}40`,
  },
  customBackgrounds: {
    primary: `linear-gradient(60deg, ${palette.primary.light}, ${palette.primary.dark});`,
    secondary: `linear-gradient(60deg, ${palette.secondary.light}, ${palette.secondary.dark});`,
    info: `linear-gradient(60deg, ${palette.info.light}, ${palette.info.dark});`,
    error: `linear-gradient(60deg, ${palette.error.light}, ${palette.error.dark});`,
    warning: `linear-gradient(60deg, ${palette.warning.light}, ${palette.warning.dark});`,
    success: `linear-gradient(60deg, ${palette.success.light}, ${palette.success.dark});`,
    inactive: `linear-gradient(60deg, ${palette.inactive.light}, ${palette.inactive.dark});`,
  },
});
