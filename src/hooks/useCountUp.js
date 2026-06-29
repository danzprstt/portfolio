import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` once the element scrolls into view.
 * Replaces the anime.js + IntersectionObserver pattern used across the
 * original pages, without pulling in anime.js as a dependency.
 *
 * @param {number} target
 * @param {object} opts - { duration, suffix, threshold }
 */
export default function useCountUp(target, opts = {}) {
  const { duration = 1600, suffix = '', threshold = 0.5 } = opts;
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              // easeOutExpo, matching the original anime.js easing
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return { ref, display: `${value}${suffix}` };
}
