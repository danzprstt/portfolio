import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutGrid, ShoppingBag, Phone, Calendar, FolderCheck, Users, TrendingUp,
  Terminal, Code2, Network, MessageCircle, ArrowRight, Star,
} from 'lucide-react';
import SEO from '../../components/SEO';
import BackgroundFX from '../../components/BackgroundFX';
import Globe from '../../components/Globe';
import useParticles from '../../hooks/useParticles';
import useCountUp from '../../hooks/useCountUp';
import useReveal from '../../hooks/useReveal';
import useCardGlow from '../../hooks/useCardGlow';
import { dtAlert } from '../../utils/swal';
import { CONTACT } from '../../data/nav';
import './Home.css';

function StatCard({ icon, target, label, title, desc }) {
  const { ref: countRef, display } = useCountUp(target);
  const revealRef = useReveal();

  const setRefs = (el) => {
    countRef.current = el;
    revealRef.current = el;
  };

  return (
    <div
      className="stat-card reveal"
      ref={setRefs}
      onClick={() => dtAlert({ icon: 'info', title, html: `<p>${desc}</p>`, confirmButtonText: 'Oke' })}
    >
      <div className="stat-icon">{icon}</div>
      <span className="stat-num">{display}</span>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function HighlightCard({ to, thumbClass, icon, badgeClass, badgeText, title, desc, linkText }) {
  const revealRef = useReveal();
  return (
    <Link to={to} className="uiv-card highlight-card reveal" ref={revealRef}>
      <div className={`card-thumb ${thumbClass}`}>{icon}</div>
      <div className="card-body">
        <span className={`uiv-badge ${badgeClass}`} style={{ marginBottom: 10 }}>{badgeText}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="card-link">{linkText} <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}

export default function Home() {
  const particlesRef = useParticles('0,245,255');
  const cardGlowRef = useRef(null);
  useCardGlow(cardGlowRef);

  const aboutVisualRef = useReveal();
  const aboutTextRef = useReveal();
  const ctaRef = useReveal();

  const showAvailable = () => {
    dtAlert({
      icon: 'success',
      title: 'Open for Projects',
      html: `<p style="margin-bottom:18px">Siap menerima proyek baru. Hubungi melalui salah satu platform berikut.</p>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
          <a href="${CONTACT.whatsapp}" target="_blank" style="padding:9px 20px;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:.84rem;">WhatsApp</a>
          <a href="${CONTACT.telegram}" target="_blank" style="padding:9px 20px;background:rgba(255,255,255,.07);color:#f0f0ff;border:1px solid rgba(0,245,255,.2);border-radius:50px;text-decoration:none;font-size:.84rem;">Telegram</a>
        </div>`,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  const showContact = () => {
    dtAlert({
      title: 'Hubungi Kami',
      html: `<div style="display:grid;gap:10px;margin-top:8px;">
        <a href="${CONTACT.whatsappGreet}" target="_blank" style="display:flex;align-items:center;gap:12px;padding:13px 17px;background:linear-gradient(135deg,rgba(37,211,102,.14),rgba(18,140,126,.14));border:1px solid rgba(37,211,102,.28);border-radius:13px;text-decoration:none;color:#f0f0ff;font-weight:600;font-size:.88rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <div><div>WhatsApp</div><small style="color:#7070a0;font-weight:400">+62 838-4402-6828</small></div>
        </a>
        <a href="${CONTACT.telegram}" target="_blank" style="display:flex;align-items:center;gap:12px;padding:13px 17px;background:rgba(0,245,255,.05);border:1px solid var(--border);border-radius:13px;text-decoration:none;color:#f0f0ff;font-weight:600;font-size:.88rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          <div><div>Telegram</div><small style="color:#7070a0;font-weight:400">@danzinc</small></div>
        </a>
        <a href="${CONTACT.email}" style="display:flex;align-items:center;gap:12px;padding:13px 17px;background:rgba(168,85,247,.05);border:1px solid rgba(168,85,247,.18);border-radius:13px;text-decoration:none;color:#f0f0ff;font-weight:600;font-size:.88rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <div><div>Email</div><small style="color:#7070a0;font-weight:400">whiledanz3012@gmail.com</small></div>
        </a>
      </div>`,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };

  return (
    <div ref={cardGlowRef}>
      <SEO
        title="Home"
        description="Selamat datang di danzTech. Solusi kreatif untuk bisnis modern Anda — web development, edit video, bot automation, dan layanan digital lainnya."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'danzTech',
          url: 'https://danztech.vercel.app',
          description: 'Solusi kreatif untuk bisnis modern — web development, edit video, bot automation.',
        }}
      />
      <BackgroundFX gridClass="home-bg-grid" orbClasses={['home-orb-1', 'home-orb-2', 'home-orb-3']} />
      <canvas ref={particlesRef} className="home-particles" />

      {/* HERO SPLIT */}
      <section className="hero">
        <div className="hero-split">
          <div className="hero-left fade-up-in">
            <div className="hero-badge" onClick={showAvailable}>
              <span className="badge-dot"></span>
              Available for Projects
            </div>
            <h1 className="hero-title">
              Solusi Kreatif untuk<br />
              <span className="gradient-text">Bisnis Modern</span> Anda
            </h1>
            <p className="hero-sub">
              Kami menggabungkan desain memukau dengan teknologi terkini untuk menciptakan
              pengalaman digital yang menawan dan tak terlupakan.
            </p>
            <div className="hero-btns">
              <Link to="/portofolio" className="uiv-btn uiv-btn-cyan">
                <LayoutGrid size={16} /> Lihat Portofolio
              </Link>
              <Link to="/store" className="uiv-btn uiv-btn-ghost">
                <ShoppingBag size={16} /> Store
              </Link>
              <button className="uiv-btn uiv-btn-ghost" onClick={showContact}>
                <Phone size={16} /> Hubungi
              </button>
            </div>
          </div>
          <div className="hero-right">
            <Globe theme="cyan" size={440} />
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line"></div>
          scroll
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <StatCard icon={<Calendar size={22} />} target={3} label="Tahun Pengalaman" title="Pengalaman" desc="3+ tahun menghadirkan solusi digital untuk klien dari berbagai industri." />
          <StatCard icon={<FolderCheck size={22} />} target={5} label="Proyek Selesai" title="Proyek Selesai" desc="7+ proyek telah berhasil diselesaikan dengan kualitas premium." />
          <StatCard icon={<Users size={22} />} target={11} label="Klien Puas" title="Klien Puas" desc="11+ klien dari berbagai bidang bisnis telah mempercayakan proyeknya." />
          <StatCard icon={<TrendingUp size={22} />} target={98} label="% Kepuasan" title="Tingkat Kepuasan" desc="98% klien memberikan rating bintang 5 untuk kualitas layanan kami." />
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="about-inner">
          <div className="reveal-x-left" ref={aboutVisualRef}>
            <div className="avatar-wrap">
              <div className="avatar-ring"><div className="avatar-ring-inner"></div></div>
              <div className="avatar-img">
                <img src="https://files.catbox.moe/co20m1.png" alt="Muhammad Dias Wildan Adam" loading="lazy" />
              </div>
              <div className="float-badge fb1"><Terminal size={13} /> Web Dev</div>
              <div className="float-badge fb2"><Network size={13} /> Networking</div>
              <div className="float-badge fb3"><Code2 size={13} /> Automation</div>
            </div>
          </div>
          <div className="reveal-x-right" ref={aboutTextRef}>
            <div className="section-badge">// Tentang Kami</div>
            <h2 className="section-heading">Tim di Balik <span className="gradient-text">danzTech</span></h2>
            <p className="about-desc">
              danzTech digagas oleh siswa SMK TKJ yang passionate pada web development dan teknologi
              jaringan. Kami fokus menghadirkan solusi digital yang fungsional, estetik, dan relevan
              dengan kebutuhan bisnis modern.
            </p>
            <p className="about-desc">
              Dari website portofolio, bot automation, hingga jasa edit video dan dokumen office — kami
              mengerjakan setiap proyek dengan standar kualitas yang sama tingginya.
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights-section">
        <div className="section-center">
          <div className="section-badge">// Layanan Kami</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-1px', marginTop: 12 }}>
            Apa yang Kami <span className="gradient-text">Tawarkan</span>
          </h2>
        </div>
        <div className="highlights-grid">
          <HighlightCard
            to="/portofolio"
            thumbClass="ct-p"
            icon={<LayoutGrid size={56} className="card-thumb-icon" />}
            badgeClass="uiv-badge-cyan"
            badgeText="Portfolio"
            title="Portofolio Unggulan"
            desc="Jelajahi karya terbaik yang mencerminkan komitmen terhadap kualitas dan inovasi."
            linkText="Lihat Karya"
          />
          <HighlightCard
            to="/store"
            thumbClass="ct-s"
            icon={<ShoppingBag size={56} className="card-thumb-icon" />}
            badgeClass="uiv-badge-purple"
            badgeText="Store"
            title="Produk Digital"
            desc="Edit video, bot automation, web development, dan berbagai layanan digital lainnya."
            linkText="Jelajahi Store"
          />
          <HighlightCard
            to="/testimoni"
            thumbClass="ct-t"
            icon={<Star size={56} className="card-thumb-icon" />}
            badgeClass="uiv-badge-pink"
            badgeText="Testimoni"
            title="Testimoni Klien"
            desc="Dengarkan pengalaman 11+ klien yang puas dengan layanan kami."
            linkText="Baca Testimoni"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner reveal" ref={ctaRef}>
          <div className="section-badge">// Hubungi Kami</div>
          <h2 className="cta-title">Mari Wujudkan Ide Anda <span className="gradient-text">Bersama</span></h2>
          <p className="cta-sub">Siap mengambil langkah berikutnya? Konsultasikan proyek Anda dengan kami sekarang!</p>
          <button className="uiv-btn uiv-btn-wa" style={{ fontSize: '1.02rem', padding: '14px 34px' }} onClick={showContact}>
            <MessageCircle size={18} /> Hubungi Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
