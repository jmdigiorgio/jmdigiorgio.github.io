// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import ResumePage from './components/ResumePage';
import Splash from './components/Splash';
import Reqify from './components/projects/Reqify';
import { theme } from './theme';  // Import the external theme
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Adds consistent baseline styles */}
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<ResumePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/projects/reqify" element={<Reqify />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;