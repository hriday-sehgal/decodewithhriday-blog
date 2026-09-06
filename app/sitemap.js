import { client } from '@/lib/sanity';

export default async function sitemap() {
  const baseUrl = 'https://decodewithhriday.vercel.app';

  // Fetch all posts from Sanity
  let posts = [];
  try {
    posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _createdAt,
      _updatedAt
    }`);
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
  }

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post._updatedAt || post._createdAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...blogUrls];
}
