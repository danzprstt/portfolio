import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal, Globe as GlobeIcon, Palette, Zap, Code2, Network, Radio,
  GraduationCap, School, Users, Contact, Mail, MessageCircle, Send,
  Play, Pause, Award,
} from 'lucide-react';
import SEO from '../../components/SEO';
import BackgroundFX from '../../components/BackgroundFX';
import Globe from '../../components/Globe';
import CertificateMarquee from '../../components/CertificateMarquee';
import { InstagramIcon, GithubIcon } from '../../components/BrandIcons';
import useTypewriter from '../../hooks/useTypewriter';
import useReveal from '../../hooks/useReveal';
import useSkillBar from '../../hooks/useSkillBar';
import useCountUp from '../../hooks/useCountUp';
import useCardGlow from '../../hooks/useCardGlow';
import { dtAlert, dtToast } from '../../utils/swal';
import { CONTACT } from '../../data/nav';
import { SKILLS, PROJECTS } from '../../data/portofolioData';
import { CERTIFICATES } from '../../data/certificates';
import './Portofolio.css';
import msc from "../../assets/images/stilyg.jpg";
import musik from "../../assets/audio/isstilyoung.mp3";

const SKILL_ICONS = { Globe: GlobeIcon, Palette, Zap, Code2, Network, Radio };

function SkillCard({ skill }) {
  const { ref, width } = useSkillBar(skill.pct);
  const Icon = SKILL_ICONS[skill.icon];
  const revealRef = useReveal();

  const showSkill = () => {
    dtAlert({
      title: skill.name,
      html: `<p style="margin-bottom:16px">${skill.desc}</p>
        <div style="background:rgba(255,255,255,.06);border-radius:50px;height:9px;overflow:hidden;margin-bottom:8px;">
          <div style="height:100%;width:${skill.pct}%;background:linear-gradient(90deg,#00f5ff,#a855f7);border-radius:50px;transition:width 1.1s ease;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.76rem;color:#6a6a8a;font-family:'JetBrains Mono',monospace;">
          <span>${skill.level}</span><span>${skill.pct}%</span></div>`,
      confirmButtonText: 'Oke',
    });
  };

  return (
    <div
      className="uiv-card skill-card reveal"
      ref={(el) => { ref.current = el; revealRef.current = el; }}
      onClick={showSkill}
    >
      <div className="skill-head">
        <div className="skill-ico"><Icon size={20} /></div>
        <div>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-lvl">{skill.level} &mdash; {skill.pct}%</div>
        </div>
      </div>
      <div className="skill-bar-wrap">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const revealRef = useReveal();

  const showProject = () => {
    dtAlert({
      title: project.title,
      html: `<p style="margin-bottom:14px;line-height:1.7">${project.detail}</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">
          ${project.tech.map((t) => `<span style="padding:3px 11px;background:rgba(0,245,255,.09);border:1px solid rgba(0,245,255,.2);border-radius:50px;font-size:.73rem;color:#00f5ff;font-family:'JetBrains Mono',monospace;">${t}</span>`).join('')}
        </div>`,
      confirmButtonText: 'Keren',
    });
  };

  return (
    <div className="uiv-card project-card reveal" ref={revealRef} onClick={showProject}>
      <div className="project-thumb">
        <img src={project.image} alt={project.title} loading="lazy" width="380" height="160" />
      </div>
      <div className="project-body">
        <span className={`uiv-badge ${project.badge.cls}`} style={{ marginBottom: 9 }}>{project.badge.text}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="tech-list">
          {project.tech.map((t) => <span className="tech" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function showCertificateDetail(cert) {
  dtAlert({
    title: cert.title,
    html: `<p style="margin-bottom:10px;color:var(--cyan);font-family:'JetBrains Mono',monospace;font-size:.85rem">${cert.issuer}</p>
      <p style="color:var(--gray)">Diperoleh tahun ${cert.year}.</p>`,
    confirmButtonText: 'Tutup',
  });
}

function CountStat({ target, suffix, label }) {
  const { ref, display } = useCountUp(target, { suffix, duration: 1500 });
  return (
    <div className="s-stat" ref={ref}>
      <div className="s-num">{display}</div>
      <div className="s-lbl">{label}</div>
    </div>
  );
}

export default function Portofolio() {
  const cardGlowRef = useRef(null);
  useCardGlow(cardGlowRef);

  const aboutRef = useReveal();
  const certSectionRef = useReveal();

  const typed = useTypewriter([
    'TKJ Student | Web Developer | Network Enthusiast',
    'SMK KBM 1 — Teknik Komputer dan Jaringan',
    'Passionate about Technology & Innovation',
  ]);

  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <div ref={cardGlowRef}>
      <SEO
        title="Portofolio"
        description="Portofolio Muhammad Dias Wildan Adam — proyek web development, networking, automation, dan sertifikat yang telah diperoleh."
        path="/portofolio"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            name: 'Muhammad Dias Wildan Adam',
            jobTitle: 'TKJ Student & Web Developer',
          },
        }}
      />
      <BackgroundFX gridClass="portofolio-bg-grid" />

      <section className="page-hero fade-up-in">
        <div className="section-badge">// Portofolio</div>
        <h1 className="page-title"><span className="gradient-text">MDWA</span> Portfolio</h1>
        <div className="globe-side">
          <Globe theme="purple" size={320} />
        </div>
        <p className="page-sub">{typed}</p>
      </section>

      <div className="about-strip reveal" ref={aboutRef}>
        <div className="strip-avatar-wrap">
          <div className="strip-ring"></div>
          <div className="strip-avatar">
            <img src="https://files.catbox.moe/co20m1.png" alt="Muhammad Dias Wildan Adam" loading="lazy" />
          </div>
        </div>
        <div>
          <div className="name">Muhammad Dias Wildan Adam</div>
          <div className="role">
            <Terminal size={13} />
            TKJ Student &middot; Web Vibe &middot; Network Enthusiast
          </div>
          <p className="bio">Siswa SMK KBM 1 kelas X TKJ 4, passionate dalam web development dan teknologi jaringan. Terus belajar HTML, CSS, JavaScript, Python, Cisco Networking, dan  berbagai Framework.</p>
          <div className="strip-stats">
            <CountStat target={3} suffix="+" label="Tahun" />
            <CountStat target={10} suffix="+" label="Proyek" />
            <CountStat target={CERTIFICATES.length} suffix="+" label="Sertifikat" />
          </div>
        </div>
      </div>

      <section className="skills-section">
        <div className="section-center">
          <div className="section-badge">// Skills &amp; Tools</div>
          <h2 className="section-heading">Kemampuan yang <span className="gradient-text">Saya Kuasai</span></h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s) => <SkillCard skill={s} key={s.name} />)}
        </div>
      </section>

      <section className="projects-section">
        <div className="section-center">
          <div className="section-badge">// Featured Projects</div>
          <h2 className="section-heading">Karya yang Telah <span className="gradient-text">Saya Buat</span></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => <ProjectCard project={p} key={p.title} />)}
        </div>
      </section>

      {/* ── CERTIFICATES (new section): auto-running marquee, draggable ── */}
      <section className="certificates-section">
        <div className="section-center reveal" ref={certSectionRef}>
          <div className="section-badge">// Sertifikat</div>
          <h2 className="section-heading">
            <Award size={28} style={{ verticalAlign: 'middle', marginRight: 8, color: 'var(--purple)' }} />
            Sertifikat &amp; <span className="gradient-text">Pencapaian</span>
          </h2>
        </div>
        <CertificateMarquee certificates={CERTIFICATES} onSelect={showCertificateDetail} />
      </section>

      <section className="hub-section">
        <div className="section-center">
          <div className="section-badge">// School Resources</div>
          <h2 className="section-heading">Portal <span className="gradient-text">Sekolah</span></h2>
        </div>
        <div className="hub-grid">
          <Link to="/undefine" className="uiv-card hub-card">
            <div className="hub-ico"><GraduationCap size={22} /></div>
            <h3>Portal TKJ</h3><p>Portal pembelajaran TKJ</p>
            <span className="uiv-badge uiv-badge-pink" style={{ marginBottom: 9 }}>In Development!</span>
          </Link>
          <a href="https://smk.kbm1.sch.id/" target="_blank" rel="noreferrer" className="uiv-card hub-card">
            <div className="hub-ico"><School size={22} /></div>
            <h3>Web School</h3><p>Website resmi SMK KBM 1</p>
          </a>
          <a href='https://x-tkj-4.vercel.app' target='_blank' rel='noreferrer' className='uiv-card hub-card'>       
            <div className="hub-ico"><Users size={22} /></div>
            <h3>Web X TKJ 4</h3><p>The Memory Of X TKJ 4</p>
          </a>
          <div className="uiv-card hub-card" onClick={() => dtToast('Contact page segera hadir', 'info')}>
            <div className="hub-ico"><Contact size={22} /></div>
            <h3>Contact Page</h3><p>Coming Soon</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-center" style={{ marginBottom: 0 }}>
          <div className="section-badge">// Get In Touch</div>
          <h2 className="section-heading" style={{ marginTop: 12 }}>Ayo <span className="gradient-text">Berkolaborasi</span></h2>
        </div>
        <div className="contact-links">
          <a href={CONTACT.emailContact} target="_blank" rel="noreferrer" className="contact-link"><Mail size={15} /> Email</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="contact-link"><GithubIcon size={15} /> GitHub</a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="contact-link"><MessageCircle size={15} /> WhatsApp</a>
          <a href={CONTACT.telegram} target="_blank" rel="noreferrer" className="contact-link"><Send size={15} /> Telegram</a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="contact-link"><InstagramIcon size={15} /> Instagram</a>
        </div>
      </section>

      <div className="music-player">
        <div className="music-cover"><img src={msc} alt="Cover" loading="lazy" /></div>
        <div className="music-meta"><div className="music-title">The Night Is Still Young</div><div className="music-artist">Nicki Minaj</div></div>
        <button className={`play-btn ${playing ? 'playing' : ''}`} onClick={toggleMusic} aria-label="Toggle music">
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <audio ref={audioRef} loop>
          <source src={musik} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
