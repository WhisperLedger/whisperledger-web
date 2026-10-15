import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    scrollToSection(e, sectionId, navigate, location.pathname);
  };

  return (
    <footer className="w-full border-t border-slate-200/70 bg-white mt-8 sm:mt-10">
      <div className="max-w-6xl mx-auto py-8 sm:py-9 px-5 sm:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <img src="/assets/logo.png" alt="WhisperLedger" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-bold text-slate-900">WhisperLedger</span>
          <span className="text-slate-400">© 2026 • Built for privacy &amp; precision in India.</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 justify-center font-medium">
          <a 
            href="#product" 
            onClick={(e) => handleNavClick(e, 'product')} 
            className="hover:text-[#0066FF] transition-colors"
          >
            The product
          </a>
          <a 
            href="#features" 
            onClick={(e) => handleNavClick(e, 'features')} 
            className="hover:text-[#0066FF] transition-colors"
          >
            What it solves
          </a>
          <Link to="/privacy" className="hover:text-[#0066FF] transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-[#0066FF] transition-colors">Terms</Link>
          <a href="mailto:support@whisperledger.in" className="hover:text-[#0066FF] transition-colors">Contact support</a>
        </div>
      </div>
    </footer>
  );
};
