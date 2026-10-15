import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically scrolls window to top on route transitions,
 * and sanitizes any '#' fragment from the URL bar to keep URLs clean.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [pathname]);

  return null;
};
