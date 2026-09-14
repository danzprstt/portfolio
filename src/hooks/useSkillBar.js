import { useEffect, useRef, useState } from 'react';

/**
 * Animates a 0%->target% width once the element scrolls into view.
 * Replaces the anime.js-driven `.skill-bar-fill` width animation.
 */
export default function useSkillBar(targetPct, threshold = 0.2) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            // Small delay so the CSS transition (1.2s ease) is visible
            requestAnimationFrame(() => setWidth(targetPct));
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetPct, threshold]);

  return { ref, width };
}
