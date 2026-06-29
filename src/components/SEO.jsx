import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://danztech.vercel.app';
const DEFAULT_IMAGE = 'https://files.catbox.moe/ktmmku.jpg';

/**
 * Centralized per-page SEO tags: title, description, canonical, Open Graph,
 * Twitter card, and optional JSON-LD structured data. Used on every route so
 * each page gets its own indexable metadata instead of one shared template.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  jsonLd = null,
}) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title ? `danzTech – ${title}` : 'danzTech – Home';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
