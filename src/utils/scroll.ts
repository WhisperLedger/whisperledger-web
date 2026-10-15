import React from 'react';
import { NavigateFunction } from 'react-router-dom';

/**
 * Cleanly scrolls to any section element by ID without modifying window.location.hash.
 * Removes any '#' currently in the address bar via history.replaceState,
 * ensuring clean URLs like 'https://whisperledger.in/' during traversal.
 */
export function scrollToSection(
  e?: React.MouseEvent | Event,
  elementId?: string,
  navigate?: NavigateFunction,
  pathname?: string
) {
  if (e && 'preventDefault' in e) {
    e.preventDefault();
  }

  // If currently on another route (like /privacy or /terms) and navigate function is provided,
  // transition to '/' cleanly without putting '#' in the URL.
  if (pathname && pathname !== '/' && pathname !== '' && navigate) {
    navigate('/', { state: { scrollTo: elementId } });
    return;
  }

  // Remove any '#' currently in the browser URL bar
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  if (!elementId) return;

  const el = document.getElementById(elementId);
  if (!el) return;

  if (elementId === 'notify') {
    const rect = el.getBoundingClientRect();
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop && rect.height < window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const navOffset = 80;
      const targetY = window.pageYOffset + rect.top - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }

    setTimeout(() => {
      const input = el.querySelector<HTMLInputElement>('input[type="email"]');
      if (input) {
        input.focus({ preventScroll: true });
      }
    }, 450);
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Shortcut helper to scroll cleanly to the waitlist / VIP early access section.
 */
export function scrollToWaitlist(e?: React.MouseEvent, navigate?: NavigateFunction, pathname?: string) {
  scrollToSection(e, 'notify', navigate, pathname);
}
