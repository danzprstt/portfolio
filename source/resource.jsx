import { Link } from 'react-router-dom';
import { AlertTriangle, House } from 'lucide-react';
import SEO from '../../components/SEO';
import './resource.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <SEO
        title="404"
        description="Halaman tidak ditemukan atau sedang dalam tahap pembuatan."
        path="/undefine"
      />
      <div className="notfound-icon"><AlertTriangle size={28} /></div>
      <div className="notfound-code">404</div>
      <p className="notfound-msg">
        Halaman ini belum tersedia atau sedang dalam tahap pembuatan. Silakan kembali ke beranda.
      </p>
      <div className="notfound-btn-wrap">
        <Link to="/" className="uiv-btn uiv-btn-cyan notfound-btn">
          <House size={16} /> Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
