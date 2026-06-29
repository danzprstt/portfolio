import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-reveal: adds a `.reveal-in` class once an element
 * enters the viewport. Pairs with the `.reveal` CSS utility (opacity+
 * translateY transition) defined in index.css. This replaces GSAP
 * ScrollTrigger so pages don't have to load the GSAP + ScrollTrigger
 * bundle just for fade-up-on-scroll effects.
 *
 * @param {object} opts - { threshold, rootMargin }
 */
export default function useReveal(opts = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = opts;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
