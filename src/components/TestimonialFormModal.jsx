import { useEffect, useState } from 'react';
import { X, Star, User, Briefcase, MessageSquareText, Send } from 'lucide-react';
import './TestimonialFormModal.css';

/**
 * Custom testimonial submission modal — replaces the old SweetAlert2
 * HTML-string form with a properly styled card: name/role fields with
 * icons, an interactive tap-to-rate star picker, and a roomy textarea.
 * Submitting opens WhatsApp with a prefilled message, same as before.
 *
 * State resets naturally because the parent remounts this component with
 * a fresh `key` each time it opens (see Testimoni.jsx) — no imperative
 * reset-on-open effect needed here.
 */
export default function TestimonialFormModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // Lock page scroll while modal is open, like the previous SweetAlert2 behaviour
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) {
      setError('Nama dan testimoni wajib diisi.');
      return;
    }
    setError('');
    onSubmit({ name: trimmedName, role: role.trim(), rating, text: trimmedText });
  };

  const activeStars = hoverRating || rating;

  return (
    <div className="tf-overlay" onClick={onClose}>
      <div className="tf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tf-close" onClick={onClose} aria-label="Tutup form">
          <X size={18} />
        </button>

        <div className="tf-head">
          <div className="tf-head-icon"><MessageSquareText size={20} /></div>
          <div>
            <h3>Bagikan Pengalaman Anda</h3>
            <p>Testimoni Anda akan dikirim ke danzTech melalui WhatsApp.</p>
          </div>
        </div>

        <form className="tf-form" onSubmit={handleSubmit}>
          <div className="tf-row">
            <div className="tf-field">
              <label htmlFor="tf-name"><User size={13} /> Nama</label>
              <input
                id="tf-name"
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                autoComplete="name"
              />
            </div>
            <div className="tf-field">
              <label htmlFor="tf-role"><Briefcase size={13} /> Peran / Profesi <span className="tf-optional">(opsional)</span></label>
              <input
                id="tf-role"
                type="text"
                placeholder="cth. Owner UMKM"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength={60}
              />
            </div>
          </div>

          <div className="tf-field">
            <label>Rating Anda</label>
            <div className="tf-stars" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  className="tf-star-btn"
                  onMouseEnter={() => setHoverRating(n)}
                  onClick={() => setRating(n)}
                  aria-label={`Beri rating ${n} bintang`}
                >
                  <Star size={26} fill={n <= activeStars ? 'currentColor' : 'none'} strokeWidth={n <= activeStars ? 0 : 1.6} />
                </button>
              ))}
              <span className="tf-rating-label">{rating}/5</span>
            </div>
          </div>

          <div className="tf-field">
            <label htmlFor="tf-text"><MessageSquareText size={13} /> Testimoni</label>
            <textarea
              id="tf-text"
              placeholder="Ceritakan pengalaman Anda menggunakan layanan danzTech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={4}
            />
            <div className="tf-char-count">{text.length}/500</div>
          </div>

          {error && <div className="tf-error">{error}</div>}

          <div className="tf-actions">
            <button type="button" className="uiv-btn uiv-btn-ghost" onClick={onClose}>Batal</button>
            <button type="submit" className="uiv-btn uiv-btn-purple">
              <Send size={15} /> Kirim via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
