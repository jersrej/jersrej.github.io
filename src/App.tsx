import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SkipToContent } from './components/SkipToContent';
import SinglePage from './pages/SinglePage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-gray-100">
      <SkipToContent />
      <Header />

      <div className="flex-1" id="main-content">
        <Routes>
          <Route path="/*" element={<SinglePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
