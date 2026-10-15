import React from 'react';

/**
 * Smoothly scrolls to the VIP Early Access waitlist section,
 * vertically centering the entire card in the viewport on desktop
 * or positioning it cleanly below the fixed navbar on mobile.
 */
export function scrollToWaitlist(e?: React.MouseEvent) {
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

  if (e && isHomePage) {
    e.preventDefault();
    if (window.location.hash !== '#notify') {
      window.history.pushState(null, '', '#notify');
    }
  }

  const el = document.getElementById('notify');
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const isDesktop = window.innerWidth >= 1024;

  if (isDesktop && rect.height < window.innerHeight) {
    // Vertically center the entire waitlist card in the viewport
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // On mobile or small screens, position with comfortable breathing room below sticky navbar
    const navOffset = 76;
    const targetY = window.pageYOffset + rect.top - navOffset;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }

  // Politely focus the email input without jarring screen jumps
  setTimeout(() => {
    const input = el.querySelector<HTMLInputElement>('input[type="email"]');
    if (input) {
      input.focus({ preventScroll: true });
    }
  }, 450);
}
