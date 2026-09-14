// Service catalog extracted from store/index.html, grouped by category.
export const SERVICE_CATEGORIES = [
  {
    id: 'web',
    title: 'Web Development',
    icon: 'Code2',
    items: [
      { id: 'web-1', name: 'Landing Page (1 halaman)', price: 75000 },
      { id: 'web-2', name: 'Company Profile (3-5 halaman)', price: 150000 },
      { id: 'web-3', name: 'Portfolio Website', price: 100000 },
      { id: 'web-4', name: 'E-Commerce / Toko Online ( no payment gateway )', price: 250000 },
    ],
  },
  {
    id: 'video',
    title: 'Edit Video',
    icon: 'Video',
    items: [
      { id: 'vid-1', name: 'Edit Video Pendek (Reels/TikTok)', price: 25000 },
      { id: 'vid-2', name: 'Edit Video Panjang (YouTube)', price: 60000 },
      { id: 'vid-3', name: 'Motion Graphic / Animasi Teks', price: 40000 },
      { id: 'vid-4', name: 'Color Grading & Audio Mixing', price: 35000 },
      { id: 'vid-5', name: 'Typography', price: 40000},
    ],
  },
  {
    id: 'bot',
    title: 'Bot Automation',
    icon: 'Bot',
    items: [
      { id: 'bot-1', name: 'Bot WhatsApp (Auto Reply)', price: 100000 },
      { id: 'bot-2', name: 'Bot Telegram Custom', price: 90000 },
      { id: 'bot-3', name: 'Bot Discord (Moderation/Music)', price: 85000 },
      { id: 'bot-4', name: 'Script Automation Python', price: 70000 },
      { id: 'bot-5', name: 'Bot Store ( support whatsApp, Telegram )', price: 50000}
    ],
  },
  {
    id: 'office',
    title: 'Dokumen & Office',
    icon: 'FileText',
    items: [
      { id: 'doc-1', name: 'Desain PowerPoint Presentasi', price: 30000 },
      { id: 'doc-2', name: 'Pengetikan & Format Dokumen Word', price: 20000 },
      { id: 'doc-3', name: 'Spreadsheet & Rumus Excel', price: 35000 },
      { id: 'doc-4', name: 'Convert PDF / Edit PDF', price: 15000 },
      { id: 'doc-5', name: 'Makalah all presentasi', price: 35000}
    ],
  },
  {
    id: 'network',
    title: 'Networking & IT Support',
    icon: 'Network',
    items: [
      { id: 'net-1', name: 'Install OS windows/linux', price: 120000 },
      { id: 'net-2', name: 'Konfigurasi Router/Mikrotik', price: 100000 },
      { id: 'net-3', name: 'Troubleshooting PC/Laptop', price: 50000 },
      { id: 'net-4', name: 'Install MS Office', price: 30000 },
    ],
  },
];

export const formatIDR = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
