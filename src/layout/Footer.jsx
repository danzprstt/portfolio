import { Link } from 'react-router-dom';
import { House, LayoutGrid, Star, ShoppingBag, Wrench, Zap, MessageCircle, Send } from 'lucide-react';
import { InstagramIcon, GithubIcon } from '../components/BrandIcons';
import { PAGES, CONTACT } from '../data/nav';

const ICONS = { House, LayoutGrid, Star, ShoppingBag };

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo-icon-wrap">
            <Zap size={18} strokeWidth={2.2} />
          </div>
          <span className="logo-text">danz<span className="gradient-text">Tech</span></span>
        </div>
        <nav className="footer-nav">
          {PAGES.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <Link key={p.path} to={p.path}>
                <Icon size={13} strokeWidth={2} />
                {p.label}
              </Link>
            );
          })}
          <Link to="/progress">
            <Wrench size={13} strokeWidth={2} />
            Tools
          </Link>
        </nav>
        <div className="footer-contact">
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={13} strokeWidth={2} /> WhatsApp
          </a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon size={13} strokeWidth={2} /> Instagram
          </a>
          <a href={CONTACT.telegram} target="_blank" rel="noreferrer">
            <Send size={13} strokeWidth={2} /> Telegram
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            <GithubIcon size={13} strokeWidth={2} /> GitHub
          </a>
        </div>
        <p className="footer-copy">&copy; 2026 <span>danzTech</span> &middot; Muhammad Dias Wildan Adam &middot; SMK KBM 1</p>
      </div>
    </footer>
  );
}
