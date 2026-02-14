import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import SinglePage from './pages/SinglePage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/*" element={<SinglePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
