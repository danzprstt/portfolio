import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { House, LayoutGrid, Star, ShoppingBag, Wrench, Zap } from 'lucide-react';
import useTooltips from '../hooks/useTooltips';
import { PAGES } from '../data/nav';

const ICONS = { House, LayoutGrid, Star, ShoppingBag };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const navRef = useRef(null);

  useTooltips(navRef, 'bottom');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setProgress(max > 0 ? (d.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <div className="page-progress" style={{ width: `${progress}%` }} />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <div className="logo-icon-wrap">
            <Zap size={20} strokeWidth={2.2} />
          </div>
          <span className="logo-text">danz<span>Tech</span></span>
        </Link>

        <ul className={`nav-menu ${open ? 'open' : ''}`}>
          {PAGES.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <li key={p.path}>
                <NavLink
                  to={p.path}
                  end
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  data-tip={p.label}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={14} strokeWidth={2} />
                  {p.label}
                </NavLink>
              </li>
            );
          })}
          <li>
            <NavLink
              to="/progress" //gunakan untuk mendirrect saja ke domain example "https://danz-tools.vercel.app"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              data-tip="Buka danz-tools"
              onClick={() => setOpen(false)}
            >
              <Wrench size={14} strokeWidth={2} />
              Tools
            </NavLink>
          </li>
        </ul>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
        <div
          className={`nav-overlay ${open ? 'open' : ''}`}
          onClick={() => setOpen(false)}
        />
      </nav>
    </>
  );
}
