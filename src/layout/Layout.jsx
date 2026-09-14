import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Navbar.css';
import './Footer.css';
import './ScrollTop.css';

export default function Layout() {
  const [showTop, setShowTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset scroll position on route change, like a fresh page load.
  // (Previously checked `'instant' in window`, which is always false —
  // 'instant' is a valid scrollBehavior string, not a property of the
  // window object, so that branch could never be taken. 'auto' already
  // jumps immediately with no animation, so it's the correct value here.)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <button
        className={`scroll-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
