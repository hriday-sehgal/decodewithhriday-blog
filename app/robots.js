export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://decodewithhriday.vercel.app/sitemap.xml',
  };
}
