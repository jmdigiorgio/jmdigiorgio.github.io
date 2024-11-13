// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import ResumePage from './components/ResumePage';
import Splash from './components/Splash';
import Reqify from './components/projects/Reqify'; // Import your Reqify component
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Splash />} />  {/* Render Splash when accessing root path */}
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects/reqify" element={<Reqify />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
