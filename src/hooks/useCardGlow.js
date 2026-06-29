import { useEffect } from 'react';

/**
 * Mouse-glow effect for `.uiv-card` elements — ports initCardGlow() from
 * shared.js. Attaches a mousemove listener that updates CSS vars used by
 * the ::after radial-gradient glow defined in index.css.
 */
export default function useCardGlow(containerRef) {
  useEffect(() => {
    const root = containerRef?.current || document;
    const cards = root.querySelectorAll('.uiv-card');
    const handlers = [];

    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      };
      card.addEventListener('mousemove', onMove);
      handlers.push(() => card.removeEventListener('mousemove', onMove));
    });

    return () => handlers.forEach((fn) => fn());
  });
}
