import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Gallery from './Gallery.tsx';
import Donate from './pages/Donate.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  </StrictMode>
);