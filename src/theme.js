import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
      contrastText: grey[900],
    },
    secondary: {
      main: grey[500],
      light: grey[300],
      dark: grey[700],
      contrastText: '#000000',
    },
    background: {
      default: grey[50],
      paper: grey[100],
    },
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.08)',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          color: grey[900],
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            color: grey[900],
          },
          color: grey[900],
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Arial, sans-serif',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
          color: grey[900],
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: 'Arial, sans-serif',
          color: grey[900],
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: grey[900],
          '&:hover': {
            color: grey[700],
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        }
      }
    }
  }
});