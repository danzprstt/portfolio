# danzTech Portfolio — React Edition

Migrasi dari static HTML multi-halaman ke React + Vite. Tampilan dan konsep desain (warna, layout, animasi) **dipertahankan 1:1** dari versi asli — yang berubah adalah arsitekturnya: dari beberapa file HTML statis menjadi satu Single Page Application (SPA) dengan routing, komponen reusable, dan SEO yang lebih lengkap.

## Cara menjalankan

```bash
npm install
npm run dev        # development server
npm run build       # build production ke folder dist/
npm run preview     # preview hasil build
npm run lint         # cek kualitas kode
```

## Struktur halaman (routing)

| Route          | Konten                                              |
|----------------|------------------------------------------------------|
| `/`            | Home — hero, stats, about, highlights, CTA          |
| `/portofolio`  | Portofolio — skills, projects, **sertifikat (baru)**, hub sekolah, kontak |
| `/store`       | Store — katalog layanan, keranjang, checkout WhatsApp |
| `/testimoni`   | Testimoni — rating overview, daftar testimoni, form tambah |
| `/progress`    | Dashboard progress API (porting dari `progress/index.html`) |
| `/undefine`    | Halaman "Tools" — masih under construction (404-style) |
| `*`            | 404 fallback (sama seperti `/undefine`) |

Tools, Store, dan Testimoni masing-masing tetap menjadi **halaman/route terpisah**, dan navbar + footer + semua kartu CTA punya tombol untuk menavigasikan ke sana.

## Fitur baru yang ditambahkan

### 1. Section Sertifikat (di halaman Portofolio)
Komponen `src/components/CertificateMarquee.jsx` — carousel sertifikat yang:
- **Auto-berjalan terus-menerus ke kiri** (CSS animation, infinite loop, mulus tanpa "patah").
- **Bisa digeser manual**: klik & tahan (atau drag di mobile) untuk menggeser kartu sesuai keinginan; animasi otomatis berhenti selama digeser, lalu lanjut lagi setelah dilepas.
- Klik singkat (tanpa drag) pada kartu akan membuka detail sertifikat via modal.
- Saat ini memakai **data placeholder** di `src/data/certificates.js` — ganti field `image` dengan path/URL gambar sertifikat asli Anda kapan saja, tidak perlu ubah komponen.

### 2. SEO lengkap
- Setiap halaman punya `<title>`, meta description, canonical URL, Open Graph, dan Twitter Card sendiri (lihat `src/components/SEO.jsx`), bukan template generik yang dibagi ke semua halaman seperti sebelumnya.
- `public/robots.txt` dan `public/sitemap.xml` ditambahkan.
- Structured data (JSON-LD schema.org) untuk Home, Portofolio, Store, dan Testimoni.
- Hierarki heading semantik diperbaiki: satu `<h1>` per halaman, `<h2>` untuk subsection.

### 3. Optimasi performa ("mengurangi beratnya website")
- Gambar JPG besar (sampai 610KB) dikonversi ke **WebP** dengan resize, total turun dari ~1.5MB menjadi ~132KB (penghematan ~91%).
- **Code-splitting per halaman** (React.lazy + Suspense) — pengunjung hanya download kode halaman yang sedang dibuka.
- **Three.js (untuk globe 3D) dan SweetAlert2 di-lazy-load** sebagai chunk terpisah — tidak membebani initial load, baru diambil saat benar-benar dibutuhkan (globe dirender / modal dibuka).
- GSAP (dependency yang tidak terpakai di kode asli) dihapus; animasi scroll diganti `IntersectionObserver` native yang jauh lebih ringan daripada library animasi.
- `loading="lazy"` dan dimensi eksplisit pada gambar untuk mencegah layout shift.

## Struktur folder

```
src/
  components/   # komponen reusable: Globe, SEO, CertificateMarquee, BackgroundFX, dll
  layout/        # Navbar, Footer, Layout (wrapper semua halaman)
  pages/         # satu folder per halaman (Home, Portofolio, Store, Testimoni, Progress, NotFound)
  hooks/          # custom hooks: useReveal, useCountUp, useTooltips, useCardGlow, dll
  data/           # data statis: nav, certificates, testimonials, storeData, dll
  utils/          # helper SweetAlert2 dark-theme
```

## Catatan untuk Anda

- **Sertifikat**: edit `src/data/certificates.js`, isi `image` dengan path gambar (taruh file di `public/images/` lalu referensikan `/images/nama-file.webp`, atau pakai URL hosted).
- **Harga layanan Store**: edit `src/data/storeData.js`.
- **Testimoni**: edit `src/data/testimonials.js`.
- Semua warna/font/spacing memakai CSS variable yang sama dengan versi asli (`--cyan`, `--purple`, `--pink`, dll di `src/index.css`) — jadi mengubah tema global hanya perlu edit di satu tempat.

