import { useMemo, useRef, useState } from 'react';
import {
  Search, ShoppingCart, X, Trash2, MessageCircle, Code2, Video, Bot,
  FileText, Network, PackageOpen, Plus,
} from 'lucide-react';
import SEO from '../../components/SEO';
import useCardGlow from '../../hooks/useCardGlow';
import useReveal from '../../hooks/useReveal';
import { dtToast } from '../../utils/swal';
import { SERVICE_CATEGORIES, formatIDR } from '../../data/storeData';
import './Store.css';

const CAT_ICONS = { Code2, Video, Bot, FileText, Network };

function ServiceCategoryBlock({ category, onAdd }) {
  const Icon = CAT_ICONS[category.icon];
  const revealRef = useReveal();
  return (
    <div className="services-wrap">
      <div className="cat-title">
        <Icon size={18} style={{ color: 'var(--purple)' }} />
        {category.title}
      </div>
      <div className="services-grid">
        <div className="uiv-card svc-card reveal" ref={revealRef} style={{ gridColumn: '1 / -1' }}>
          <div className="svc-card-head">
            <div className="svc-card-head-ico"><Icon size={18} /></div>
            <h3>{category.title}</h3>
          </div>
          <div className="svc-items">
            {category.items.map((item) => (
              <div className="svc-item" key={item.id}>
                <span className="svc-name">{item.name}</span>
                <span className="svc-right">
                  <span className="svc-price">{formatIDR(item.price)}</span>
                  <button className="add-btn" aria-label={`Tambah ${item.name}`} onClick={() => onAdd(item)}>
                    <Plus size={14} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const cardGlowRef = useRef(null);
  useCardGlow(cardGlowRef);

  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [cart, setCart] = useState([]); // [{id, name, price, qty}]
  const [cartOpen, setCartOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    return SERVICE_CATEGORIES
      .filter((c) => activeCat === 'all' || c.id === activeCat)
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
      }))
      .filter((c) => c.items.length > 0);
  }, [query, activeCat]);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === item.id);
      if (found) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    dtToast(`${item.name} ditambahkan ke keranjang`, 'success');
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const itemCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    const lines = cart.map((c) => `- ${c.name} x${c.qty} (${formatIDR(c.price * c.qty)})`).join('\n');
    const msg = `Halo danzTech! Saya ingin memesan:\n${lines}\n\nTotal: ${formatIDR(total)}`;
    window.open(`https://wa.me/6283844026828?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div ref={cardGlowRef}>
      <SEO
        title="Store"
        description="Store danzTech — layanan web development, edit video, bot automation, dokumen office, dan networking dengan harga terjangkau."
        path="/store"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'danzTech Store',
          description: 'Layanan digital: web development, edit video, bot automation, dokumen office, networking.',
        }}
      />
      <div className="bg-grid store-bg-grid" />
      <div className="store-bg-glow" />

      <section className="page-hero fade-up-in">
        <div className="section-badge">// Store</div>
        <h1 className="page-title">danzTech <span className="gradient-text">Store</span></h1>
        <p className="page-sub">Layanan digital siap pakai untuk kebutuhan bisnis dan personal Anda.</p>
      </section>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={15} className="search-ico" />
          <input
            className="uiv-input"
            placeholder="Cari layanan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className={`filter-btn ${activeCat === 'all' ? 'active' : ''}`} onClick={() => setActiveCat('all')}>
          Semua
        </button>
        {SERVICE_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`filter-btn ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => setActiveCat(c.id)}
          >
            {c.title}
          </button>
        ))}
      </div>

      <section className="store-section">
        {filteredCategories.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--gray)', padding: '40px 0' }}>
            Tidak ada layanan yang cocok dengan pencarian.
          </div>
        ) : (
          filteredCategories.map((c) => (
            <ServiceCategoryBlock category={c} key={c.id} onAdd={addToCart} />
          ))
        )}
      </section>

      <button className="cart-fab" onClick={() => setCartOpen(true)} aria-label="Buka keranjang">
        <ShoppingCart size={22} />
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </button>

      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <h3><ShoppingCart size={17} /> Keranjang ({itemCount})</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Tutup keranjang">
            <X size={20} />
          </button>
        </div>
        <div className="cart-list">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <PackageOpen size={40} className="cart-empty-ico" />
              <div>Keranjang masih kosong</div>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="cart-row-info">
                  <div className="cart-row-name">{item.name} {item.qty > 1 && `x${item.qty}`}</div>
                  <div className="cart-row-price">{formatIDR(item.price * item.qty)}</div>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label={`Hapus ${item.name}`}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-total-row">
            <span>Total</span>
            <span className="cart-total-amt">{formatIDR(total)}</span>
          </div>
          <button className="checkout-btn" onClick={checkout} disabled={cart.length === 0}>
            <MessageCircle size={17} /> Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
