// src/App.js
import React from 'react';
import Header from './Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        {/* Other sections will go here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
