import porto from "../assets/images/portofolio.png";
import story from "../assets/images/storytkj.png";


export const SKILLS = [
  { icon: 'Globe', name: 'HTML5', level: 'Advanced', pct: 78, desc: 'Markup language utama untuk struktur web modern.' },
  { icon: 'Palette', name: 'CSS3', level: 'Intermediate', pct: 77, desc: 'Flexbox, Grid, Animations, Responsive Design.' },
  { icon: 'Zap', name: 'JavaScript', level: 'Intermediate', pct: 69, desc: 'ES6+, DOM, Async, animasi modern, dan integrasi UI library.' },
  { icon: 'Code2', name: 'Python', level: 'Beginner', pct: 38, desc: 'Scripting, Automation, Backend Development.' },
  { icon: 'Network', name: 'Networking', level: 'Beginner', pct: 49, desc: 'TCP/IP, Subnetting, VLAN, Troubleshooting.' },
  { icon: 'Radio', name: 'Cisco Packet Tracer', level: 'Intermediate', pct: 44, desc: 'Simulasi jaringan enterprise: routing, switching, security.' },
];

export const PROJECTS = [
  {
    image: porto,
    badge: { text: 'Web Development', cls: 'uiv-badge-cyan' },
    title: 'Portfolio Website',
    desc: 'Saya telah membuat sebuah project pertama saya yaitu portofolio, saya mengembangkan project ini berdasarkan pengalaman saya sebagai it beginner.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    detail: 'Website portofolio pribadi dengan desain modern, animasi halus, SweetAlert2, dan navigasi multi-halaman.',
  },
  {
    image: story,
    badge: { text: 'In Development', cls: 'uiv-badge-yellow' },
    title: 'Story Of School',
    desc: 'Saya memiliki project untuk membuat website untuk kelas saya sendiri dan seiringnya waktu saya akan mengganti ke profile kelas yang baru.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    detail: 'Platform pembelajaran interaktif untuk siswa SMK TKJ dengan fitur e-learning lengkap.',
  },
  {
    image: '/images/cisco.webp',
    badge: { text: 'Networking', cls: 'uiv-badge-purple' },
    title: 'Network Simulation',
    desc: 'Saya tertarik dengan teknik jaringan dan saya mempunyai ambisi besar untuk membuat sebuah cloud server, network server, virtual private/public server (vps), dan juga home server',
    tech: ['Cisco PT', 'Subnetting', 'VLAN', 'Mikrotik'],
    detail: 'Topologi jaringan enterprise mulai dari simulasi hingga implementasi real-life.',
  },
  {
    image: '/images/py-automation.webp',
    badge: { text: 'Automation', cls: 'uiv-badge-pink' },
    title: 'Python Automation',
    desc: 'Python automatication, saya membangun kemampuan untuk membuat otomatisasi sebuah project seperti bot whatsapp, telegram, dan juga discord',
    tech: ['Python', 'Authentication', 'Integration'],
    detail: 'Script Python untuk otomatisasi konfigurasi dan monitoring jaringan enterprise.',
  },
];
