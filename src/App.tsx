import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LegalPage } from './pages/LegalPage';

export const App: React.FC = () => (
  <Router>
    <div className="min-h-screen bg-canvas text-dark flex flex-col justify-between selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);
