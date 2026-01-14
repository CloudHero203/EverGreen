import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/chat" element={<Page2 />} />
      <Route path="/api-keys" element={<Page3 />} />
      <Route path="/usage" element={<Page4 />} />
    </Routes>
  );
}
