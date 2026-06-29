export const TARGET_PERCENT = 20;

export const FEATURES = [
  { id: 'security', icon: 'ShieldCheck', title: 'Keamanan', status: 'progress', badge: 'Dalam proses', body: 'Sistem enkripsi end-to-end berkemampuan tinggi guna mengamankan akses data API utama dari modifikasi eksternal.' },
  { id: 'home', icon: 'Bot', title: 'Halaman Utama', status: 'progress', badge: 'Dalam proses', body: 'Page yang mudah dimengerti dan tanpa registrasi apa pun itu.' },
  { id: 'downloader', icon: 'CreditCard', title: 'Downloader', status: 'progress', badge: 'Dalam Proses', body: 'Tools downloader yang memungkinkan Anda mengunduh video/image/mp3 dan lainnya tanpa watermark dan 100% gratis!' },
  { id: 'analytics', icon: 'LineChart', title: 'Analytics & Logging Dashboard API', status: 'planned', badge: 'Direncanakan', body: 'Pencatatan metrik performa server, monitoring rate-limit hit harian, dan sistem visualisasi penggunaan kuota request user.' },
];

export const CHART_POINTS = [
  { x: 40, y: 140, value: '1%', wk: 'Minggu 1', info: 'Inisiasi database & modul JWT selesai.' },
  { x: 105, y: 110, value: '9%', wk: 'Minggu 2', info: 'Endpoint otomatisasi teruji sukses.' },
  { x: 170, y: 90, value: '15%', wk: 'Minggu 3', info: 'Penyesuaian tampilan.' },
  { x: 235, y: 60, value: '18%', wk: 'Minggu 4', info: 'Migrasi framework.' },
  { x: 300, y: 45, value: '20%', wk: 'Kini', info: 'Mencoba memahami struktur.' },
];
