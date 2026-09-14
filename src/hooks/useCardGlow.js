import { useEffect } from 'react';

/**
 * Mouse-glow effect for `.uiv-card` elements — ports initCardGlow() from
 * shared.js. Updates CSS vars consumed by the ::after radial-gradient glow
 * defined in index.css.
 *
 * Uses a single delegated `mousemove` listener on the container instead of
 * one listener per `.uiv-card`. The previous version had no dependency
 * array, so it re-queried the DOM and re-attached a fresh listener on
 * *every* render (including on every count-up/reveal animation frame
 * elsewhere on the page) — expensive and pointless since the listeners
 * were removed and immediately re-added unchanged. Delegation also means
 * cards added or removed after mount (filtered lists, lazy content) are
 * covered automatically, with no re-subscription needed.
 */
export default function useCardGlow(containerRef) {
  useEffect(() => {
    const root = containerRef?.current || document;

    const onMove = (e) => {
      const card = e.target.closest?.('.uiv-card');
      if (!card || !root.contains(card)) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    root.addEventListener('mousemove', onMove);
    return () => root.removeEventListener('mousemove', onMove);
  }, [containerRef]);
}
