import { useEffect, useState } from 'react';
import {
  Layers, PieChart, List, CheckCircle2, RefreshCw, CalendarDays,
  ShieldCheck, Bot, CreditCard, LineChart, Boxes, AreaChart,
} from 'lucide-react';
import SEO from '../../components/SEO';
import { FEATURES, CHART_POINTS, TARGET_PERCENT } from '../../data/progressData';
import './Progress.css';

const FEATURE_ICONS = { ShieldCheck, Bot, CreditCard, LineChart };
const BADGE_CLASS = { ready: 'badge-ready', progress: 'badge-progress', planned: 'badge-planned' };

export default function Progress() {
  const [filter, setFilter] = useState('all');
  const [percent, setPercent] = useState(0);
  const [tooltip, setTooltip] = useState(null); // { x, y, wk, info }

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += 1;
      setPercent(current);
      if (current >= TARGET_PERCENT) clearInterval(id);
    }, 12);
    return () => clearInterval(id);
  }, []);

  const visibleFeatures = FEATURES.filter((f) => filter === 'all' || f.status === filter);

  const FILTERS = [
    { id: 'all', label: 'Semua Fitur', icon: List },
    { id: 'ready', label: 'Siap Rilis', icon: CheckCircle2 },
    { id: 'progress', label: 'Dalam Proses', icon: RefreshCw },
    { id: 'planned', label: 'Direncanakan', icon: CalendarDays },
  ];

  return (
    <div className="progress-page">
      <SEO
        title="API Project Progress Dashboard"
        description="Sistem pemantauan real-time perkembangan fitur, rilis, integrasi endpoint, dan metrik stabilitas sistem API danzTech."
        path="/progress"
      />
      <div className="dashboard-container">
        <header>
          <h1><Layers size={26} /> API Project Progress</h1>
          <p>Sistem Pemantauan Pengembangan Fitur &amp; Integrasi Layanan API danzTech</p>
        </header>

        <div className="progress-panel">
          <div className="progress-info">
            <span><PieChart size={15} /> Total Estimasi Penyelesaian Sistem</span>
            <span className="progress-percent">{percent}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${TARGET_PERCENT}%` }} />
          </div>
        </div>

        <div className="filter-wrapper">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                <Icon size={14} /> {f.label}
              </button>
            );
          })}
        </div>

        <div className="content-grid">
          <div className="features-wrapper">
            <h2 className="section-title"><Boxes size={17} /> Detail Fitur &amp; Rilis</h2>
            <div className="cards-stack">
              {visibleFeatures.map((f, i) => {
                const Icon = FEATURE_ICONS[f.icon];
                return (
                  <div className="feature-card" key={f.id} style={{ animationDelay: `${i * 40}ms` }}>
                    <div className="card-top">
                      <span className="card-title"><Icon size={15} /> {f.title}</span>
                      <span className={`badge ${BADGE_CLASS[f.status]}`}>{f.badge}</span>
                    </div>
                    <p className="card-body">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chart-wrapper">
            <h2 className="section-title"><AreaChart size={17} /> Tren Pengembangan</h2>
            <div className="chart-box">
              {tooltip && (
                <div
                  className="chart-tooltip visible"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  <div className="tooltip-week">{tooltip.wk}</div>
                  <div className="tooltip-detail">{tooltip.info}</div>
                </div>
              )}
              <div className="chart-container">
                <svg width="100%" height="220" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
                  <line x1="40" y1="30" x2="300" y2="30" stroke="#1f2438" strokeWidth="1" />
                  <line x1="40" y1="80" x2="300" y2="80" stroke="#1f2438" strokeWidth="1" />
                  <line x1="40" y1="130" x2="300" y2="130" stroke="#1f2438" strokeWidth="1" />
                  <line x1="40" y1="170" x2="300" y2="170" stroke="#2a304d" strokeWidth="1" />

                  <path d="M 40 170 L 40 140 L 105 110 L 170 90 L 235 60 L 300 45 L 300 170 Z" fill="var(--p-accent)" opacity="0.06" />
                  <path d="M 40 140 L 105 110 L 170 90 L 235 60 L 300 45" fill="none" stroke="var(--p-accent)" strokeWidth="2.5" strokeLinecap="round" />

                  {CHART_POINTS.map((p) => (
                    <circle
                      key={p.wk}
                      className="chart-dot"
                      cx={p.x}
                      cy={p.y}
                      r="3.5"
                      fill="var(--p-accent)"
                      onMouseEnter={(e) => {
                        const rect = e.target.closest('.chart-box').getBoundingClientRect();
                        const dotRect = e.target.getBoundingClientRect();
                        setTooltip({
                          x: dotRect.left - rect.left + dotRect.width / 2,
                          y: dotRect.top - rect.top,
                          wk: p.wk,
                          info: p.info,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}

                  {CHART_POINTS.map((p) => (
                    <text key={`${p.wk}-val`} x={p.x} y={p.y - 15} className="chart-value" textAnchor="middle">{p.value}</text>
                  ))}

                  <text x="40" y="195" className="chart-label" textAnchor="middle">Wk 1</text>
                  <text x="105" y="195" className="chart-label" textAnchor="middle">Wk 2</text>
                  <text x="170" y="195" className="chart-label" textAnchor="middle">Wk 3</text>
                  <text x="235" y="195" className="chart-label" textAnchor="middle">Wk 4</text>
                  <text x="300" y="195" className="chart-label" textAnchor="middle">Kini</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <footer>&copy; 2026 danzTech API System Dashboard &bull; Production Ready v13</footer>
      </div>
    </div>
  );
}
