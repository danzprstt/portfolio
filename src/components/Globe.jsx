import { useEffect, useRef, useState } from 'react';
import './Globe.css';

const CITY_COORDS = [
  [51.5, -0.1], [40.7, -74], [-6.2, 106.8], [35.7, 139.7], [48.8, 2.35],
  [55.75, 37.6], [1.3, 103.8], [-33.9, 151.2], [28.6, 77.2], [31.2, 121.5],
  [37.6, 126.9], [-23.5, -46.6], [30, 31.2], [-26, 28], [19.4, -99.1],
];

const ARCS = [
  [51.5, -0.1, 40.7, -74, 0x00f5ff],
  [-6.2, 106.8, 35.7, 139.7, 0xa855f7],
  [48.8, 2.35, 55.75, 37.6, 0x00f5ff],
  [1.3, 103.8, 31.2, 121.5, 0xff2d78],
  [40.7, -74, -23.5, -46.6, 0xa855f7],
  [37.6, 126.9, 28.6, 77.2, 0x00f5ff],
  [-33.9, 151.2, 1.3, 103.8, 0xff2d78],
];

/**
 * Wireframe rotating globe rendered with Three.js — ported 1:1 (visually)
 * from the IIFE used in home/index.html and portofolio/index.html.
 *
 * Three.js itself is dynamically imported so it never lands in the main
 * bundle: pages that don't render a globe never pay for it.
 *
 * @param {'cyan'|'purple'} theme - matches the two color variants used
 *   on the original site (home = cyan-led, portofolio = purple-led).
 */
export default function Globe({ theme = 'cyan', size = 440 }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let renderer, scene, camera, raf;
    let destroyed = false;
    let onResize, onMouseMove;

    (async () => {
      const THREE = await import('three');
      if (destroyed) return;

      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;

      const primary = theme === 'cyan' ? 0x00f5ff : 0xa855f7;
      const secondary = theme === 'cyan' ? 0xa855f7 : 0x00f5ff;
      const wireOpacity = theme === 'cyan' ? 0.08 : 0.055;
      const gridOpacityA = theme === 'cyan' ? 0.14 : 0.1;
      const gridOpacityB = theme === 'cyan' ? 0.1 : 0.07;
      const lonStep = theme === 'cyan' ? 20 : 20;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 3.00;

      onResize = () => {
        const w = wrap.clientWidth, h = wrap.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      onResize();
      window.addEventListener('resize', onResize);

      const R = 1;

      const wireMat = new THREE.MeshBasicMaterial({ color: primary, wireframe: true, transparent: true, opacity: wireOpacity });
      const wireMesh = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), wireMat);

      const baseMat = new THREE.MeshPhongMaterial({ color: 0x050520, transparent: true, opacity: theme === 'cyan' ? 0.6 : 0.45, shininess: theme === 'cyan' ? 90 : 60, specular: new THREE.Color(primary) });
      const baseMesh = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), baseMat);

      function addLine(pts, color, opacity) {
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity })));
      }

      for (let lat = -80; lat <= 80; lat += 20) {
        const pts = [], phi = (90 - lat) * Math.PI / 180;
        for (let lon = 0; lon <= 360; lon += 3) {
          const t = lon * Math.PI / 180;
          pts.push(new THREE.Vector3(R * 1.001 * Math.sin(phi) * Math.cos(t), R * 1.001 * Math.cos(phi), R * 1.001 * Math.sin(phi) * Math.sin(t)));
        }
        addLine(pts, primary, gridOpacityA);
      }
      for (let lon = 0; lon < 360; lon += lonStep) {
        const pts = [], theta = lon * Math.PI / 180;
        for (let lat = -90; lat <= 90; lat += 3) {
          const phi = (90 - lat) * Math.PI / 180;
          pts.push(new THREE.Vector3(R * 1.001 * Math.sin(phi) * Math.cos(theta), R * 1.001 * Math.cos(phi), R * 1.001 * Math.sin(phi) * Math.sin(theta)));
        }
        addLine(pts, secondary, gridOpacityB);
      }

      const dotGeo = new THREE.SphereGeometry(theme === 'cyan' ? 0.014 : 0.011, 8, 8);
      CITY_COORDS.forEach(([la, lo]) => {
        const phi = (90 - la) * Math.PI / 180, thetaA = lo * Math.PI / 180;
        const m = new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? primary : secondary, transparent: true, opacity: 0.9 });
        const d = new THREE.Mesh(dotGeo, m);
        d.position.set(R * 1.015 * Math.sin(phi) * Math.cos(thetaA), R * 1.015 * Math.cos(phi), R * 1.015 * Math.sin(phi) * Math.sin(thetaA));
        scene.add(d);
      });

      if (theme === 'cyan') {
        function arc(la1, lo1, la2, lo2, col) {
          const toV = (la, lo) => {
            const phi = (90 - la) * Math.PI / 180, theta = lo * Math.PI / 180;
            return new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
          };
          const v1 = toV(la1, lo1), v2 = toV(la2, lo2);
          const mid = v1.clone().add(v2).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.28);
          const pts = [];
          for (let t = 0; t <= 1; t += 0.02) {
            const p = new THREE.Vector3().lerpVectors(v1, v2, t);
            const mp = new THREE.Vector3().lerpVectors(p, mid, Math.sin(t * Math.PI) * 0.5);
            pts.push(mp.normalize().multiplyScalar(R * 1.018));
          }
          addLine(pts, col, 0.4);
        }
        ARCS.forEach(([la1, lo1, la2, lo2, col]) => arc(la1, lo1, la2, lo2, col));
      }

      const atmoMat = new THREE.MeshBasicMaterial({ color: primary, transparent: true, opacity: theme === 'cyan' ? 0.045 : 0.035, side: THREE.BackSide });
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * (theme === 'cyan' ? 1.15 : 1.12), 32, 32), atmoMat));

      scene.add(new THREE.AmbientLight(0xffffff, theme === 'cyan' ? 0.35 : 0.3));
      const dl = new THREE.DirectionalLight(primary, theme === 'cyan' ? 0.9 : 0.7);
      dl.position.set(theme === 'cyan' ? 3 : -3, 2, theme === 'cyan' ? 3 : 2);
      scene.add(dl);
      const pl = new THREE.PointLight(secondary, theme === 'cyan' ? 0.7 : 0.5, 6);
      pl.position.set(theme === 'cyan' ? -2 : 2, -1, 2);
      scene.add(pl);

      const globe = new THREE.Group();
      [wireMesh, baseMesh].forEach((m) => globe.add(m));
      scene.add(globe);

      let targetRotX = 0, targetRotY = 0, autoAngle = 0, lastMove = 0, autoRotate = true;

      onMouseMove = (e) => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 2;
        const my = (e.clientY / window.innerHeight - 0.5) * 2;
        targetRotX = my * (theme === 'cyan' ? 0.7 : 0.5);
        targetRotY = mx * (theme === 'cyan' ? 1.1 : 0.9);
        lastMove = Date.now();
        autoRotate = false;
      };
      window.addEventListener('mousemove', onMouseMove);

      const rotSpeed = theme === 'cyan' ? 0.055 : 0.04;
      const angleStep = theme === 'cyan' ? 0.004 : 0.0025;
      const idleMs = theme === 'cyan' ? 2200 : 2000;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!autoRotate && Date.now() - lastMove > idleMs) autoRotate = true;
        if (autoRotate) {
          autoAngle += angleStep;
          targetRotY = autoAngle;
          targetRotX += (0 - targetRotX) * 0.025;
        }
        globe.rotation.y += (targetRotY - globe.rotation.y) * rotSpeed;
        globe.rotation.x += (targetRotX - globe.rotation.x) * rotSpeed;
        atmoMat.opacity = (theme === 'cyan' ? 0.035 : 0.03) + Math.sin(Date.now() * (theme === 'cyan' ? 0.001 : 0.0008)) * (theme === 'cyan' ? 0.018 : 0.012);
        renderer.render(scene, camera);
      };
      tick();

      setTimeout(() => { if (!destroyed) setReady(true); }, theme === 'cyan' ? 300 : 200);

      // store cleanup on closure
      Globe._cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        renderer.dispose();
      };
    })();

    return () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener('resize', onResize);
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
      renderer?.dispose();
    };
  }, [theme]);

  return (
    <div
      className={`globe-wrap ${theme === 'purple' ? 'theme-purple' : ''}`}
      ref={wrapRef}
      style={{ width: size, height: size }}
    >
      <canvas ref={canvasRef} className={ready ? 'ready' : ''} />
    </div>
  );
}
