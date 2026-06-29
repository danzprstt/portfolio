import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <SEO
        title="404"
        description="Halaman tidak ditemukan atau sedang dalam tahap pembuatan."
        path="/undefine"
      />
      <div className="notfound-code">404</div>
      <p className="notfound-msg">
        web sedang dalam tahap pembuatan, mohon tunggu hingga owner sudah mendeploy web ini terimakasih. . .
      </p>
      <div className="notfound-btn-wrap">
        <Link to="/" className="notfound-btn">kembali ../</Link>
      </div>
    </div>
  );
}
