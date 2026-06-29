import { useEffect } from 'react';

/**
 * Lightweight tooltip-on-hover, ported from the old Floating UI based
 * implementation but without the extra dependency. Attaches to any element
 * with a `data-tip` attribute inside the given ref's subtree.
 *
 * @param {React.RefObject} containerRef
 * @param {'top'|'bottom'|'right'|'left'} placement
 */
export default function useTooltips(containerRef, placement = 'bottom') {
  useEffect(() => {
    if (window.innerWidth < 769) return;
    const root = containerRef.current;
    if (!root) return;

    const els = root.querySelectorAll('[data-tip]');
    const cleanups = [];

    els.forEach((el) => {
      let tip;
      const onEnter = () => {
        tip = document.createElement('div');
        tip.className = 'dt-tooltip';
        tip.textContent = el.dataset.tip;
        document.body.appendChild(tip);
        const r = el.getBoundingClientRect();
        const tw = tip.offsetWidth;
        const th = tip.offsetHeight;
        let top, left;
        if (placement === 'bottom') { top = r.bottom + 7; left = r.left + r.width / 2 - tw / 2; }
        else if (placement === 'top') { top = r.top - th - 7; left = r.left + r.width / 2 - tw / 2; }
        else if (placement === 'right') { top = r.top + r.height / 2 - th / 2; left = r.right + 7; }
        else { top = r.top + r.height / 2 - th / 2; left = r.left - tw - 7; }
        left = Math.max(5, Math.min(left, window.innerWidth - tw - 5));
        tip.style.top = `${top}px`;
        tip.style.left = `${left}px`;
      };
      const onLeave = () => { tip?.remove(); tip = null; };
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        tip?.remove();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [containerRef, placement]);
}
