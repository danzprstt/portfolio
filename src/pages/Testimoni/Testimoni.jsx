import { useRef, useState } from 'react';
import { Star, Quote, MessageCirclePlus } from 'lucide-react';
import SEO from '../../components/SEO';
import useCardGlow from '../../hooks/useCardGlow';
import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import TestimonialFormModal from '../../components/TestimonialFormModal';
import { dtToast } from '../../utils/swal';
import { TESTIMONIALS } from '../../data/testimonials';
import './Testimoni.css';

function Stars({ count, size = 13 }) {
  return (
    <div className="testi-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < count ? 'currentColor' : 'none'} strokeWidth={i < count ? 0 : 1.5} />
      ))}
    </div>
  );
}

function TestiCard({ t }) {
  const revealRef = useReveal();
  return (
    <div className="uiv-card testi-card reveal" ref={revealRef}>
      <Quote size={34} className="testi-quote-ico" />
      <Stars count={t.rating} />
      <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
      <div className="testi-footer">
        <div className="testi-avatar">{t.name.charAt(0)}</div>
        <div>
          <div className="testi-name">{t.name}</div>
          <div className="testi-role">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function RatingOverview({ avg, count }) {
  const sectionRef = useReveal();
  const { ref: countRef, display } = useCountUp(count, { suffix: '', duration: 1400 });

  const setRefs = (el) => {
    sectionRef.current = el;
    countRef.current = el;
  };

  return (
    <div className="uiv-card rating-overview reveal" ref={setRefs}>
      <div className="rating-big">{avg}</div>
      <Stars count={Math.round(avg)} size={18} />
      <div className="rating-count">Berdasarkan {display} testimoni klien</div>
    </div>
  );
}

function AddTestiCta({ onClick }) {
  const ref = useReveal();
  return (
    <div className="uiv-card add-testi-cta reveal" ref={ref}>
      <h3>Sudah Pernah Menggunakan Layanan Kami?</h3>
      <p>Bagikan pengalaman Anda dan bantu klien lain mengenal kualitas layanan danzTech.</p>
      <button className="uiv-btn uiv-btn-purple" onClick={onClick}>
        <MessageCirclePlus size={16} /> Tambah Testimoni
      </button>
    </div>
  );
}

export default function Testimoni() {
  const cardGlowRef = useRef(null);
  useCardGlow(cardGlowRef);

  const avg = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);

  const [formOpen, setFormOpen] = useState(false);

  const handleTestiSubmit = ({ name, role, rating, text }) => {
    const stars = '⭐'.repeat(rating);
    const msg = `Halo danzTech! Saya ${name}${role ? ` (${role})` : ''} ingin memberikan testimoni:\n\nRating: ${stars} (${rating}/5)\n"${text}"`;
    window.open(`https://wa.me/6283844026828?text=${encodeURIComponent(msg)}`, '_blank');
    setFormOpen(false);
    dtToast('Terima kasih! Lanjutkan pengiriman di WhatsApp.', 'success');
  };

  return (
    <div ref={cardGlowRef}>
      <SEO
        title="Testimoni"
        description="Testimoni klien danzTech — pengalaman nyata dari 11+ klien yang puas dengan layanan web development, edit video, dan networking kami."
        path="/testimoni"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'danzTech Services',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avg,
            reviewCount: TESTIMONIALS.length,
          },
        }}
      />
      <div className="bg-grid testimoni-bg-grid" />
      <div className="testimoni-bg-glow" />

      <section className="page-hero fade-up-in">
        <div className="section-badge">// Testimoni</div>
        <h1 className="page-title">Kata <span className="gradient-text">Klien Kami</span></h1>
        <p className="page-sub">Pengalaman nyata dari klien yang telah menggunakan layanan danzTech.</p>
      </section>

      <RatingOverview avg={avg} count={TESTIMONIALS.length} />

      <section className="testimoni-section">
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => <TestiCard t={t} key={t.name} />)}
        </div>
      </section>

      <AddTestiCta onClick={() => setFormOpen(true)} />

      <TestimonialFormModal
        key={formOpen ? 'open' : 'closed'}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleTestiSubmit}
      />
    </div>
  );
}
