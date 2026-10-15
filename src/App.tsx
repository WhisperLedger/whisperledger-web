import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LegalPage } from './pages/LegalPage';

import { AdminAccessGuard } from './components/AdminAccessGuard';

const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const AdminLogin = lazy(() =>
  import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin }))
);

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-canvas text-dark flex flex-col justify-between selection:bg-primary selection:text-white">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export const App: React.FC = () => (
  <Router>
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-mono text-sm">
          Loading WhisperLedger…
        </div>
      }
    >
      <Routes>
        {/* Public Marketing & Legal Pages */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/privacy"
          element={
            <PublicLayout>
              <LegalPage />
            </PublicLayout>
          }
        />
        <Route
          path="/terms"
          element={
            <PublicLayout>
              <LegalPage />
            </PublicLayout>
          }
        />

        {/* Dedicated Admin Operations Console - Protected by Selective IP & Passkey Guard */}
        <Route
          path="/admin"
          element={
            <AdminAccessGuard>
              <AdminDashboard />
            </AdminAccessGuard>
          }
        />
        <Route
          path="/admin/login"
          element={
            <AdminAccessGuard>
              <AdminLogin />
            </AdminAccessGuard>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </Router>
);
