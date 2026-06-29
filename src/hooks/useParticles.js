import { useEffect, useRef } from 'react';

/**
 * Connected-dot particle background, ported from the particles canvas IIFE
 * in home/index.html. Returns a ref to attach to a <canvas>.
 */
export default function useParticles(color = '0,245,255') {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    let W, H, raf;
    const pts = [];

    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 65; i++) {
      pts.push({
        x: Math.random() * 9999,
        y: Math.random() * 9999,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.4 + 0.3,
        o: Math.random() * 0.35 + 0.05,
      });
    }

    const tick = () => {
      cx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.x = ((p.x + p.vx) % W + W) % W;
        p.y = ((p.y + p.vy) % H + H) % H;
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${color},${p.o})`;
        cx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - p.x, dy = pts[j].y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            cx.beginPath();
            cx.strokeStyle = `rgba(${color},${0.065 * (1 - d / 110)})`;
            cx.lineWidth = 0.5;
            cx.moveTo(p.x, p.y);
            cx.lineTo(pts[j].x, pts[j].y);
            cx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return canvasRef;
}
