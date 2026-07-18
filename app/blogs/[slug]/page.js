import { client, urlFor } from '@/lib/sanity';
import BlogClient from './BlogClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      mainImage,
      publishedAt,
      author->{name},
      categories[]->{title}
    }`,
    { slug }
  );

  if (!post) {
    return {
      title: 'Post Not Found | Decode with Hriday',
    };
  }

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url() 
    : 'https://decodewithhriday.vercel.app/dwh_new_logo.png';

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://decodewithhriday.vercel.app/blogs/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Hriday Sehgal'],
      tags: post.categories?.map(c => c.title) || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      body,
      author->{name},
      categories[]->{title},
      publishedAt,
      slug,
      _createdAt  // Fetch _createdAt for sorting
    }`,
    { slug }
  );

    // Fetch ALL posts, ordered by creation date.  We'll find the next/prev
    // in the sorted array.  This is much more efficient than doing two
    // separate queries for each individual next/prev post.
    const allPosts = await client.fetch(
        `*[_type == "post"] | order(_createdAt asc){
            title,
            slug,
            _createdAt
        }`
    );
    // Find the index of the *current* post in the sorted array.
    const currentIndex = allPosts.findIndex((p) => p.slug.current === slug);

    // Calculate the next and previous indices, wrapping around at the ends.
    const nextIndex = (currentIndex + 1) % allPosts.length;
    const prevIndex = (currentIndex - 1 + allPosts.length) % allPosts.length;

    // Get the next and previous posts using the calculated indices.
     const nextPost = allPosts[nextIndex];
     const prevPost = allPosts[prevIndex];



    if (!post) {
        return <div>Blog post not found.</div>;
    }
  return (
        <BlogClient post={post} nextPost={nextPost} prevPost={prevPost}/>
    );
}

export async function generateStaticParams() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )
  return paths.map((slug) => ({ slug }))
}
export const dynamicParams = true;
export const revalidate = 60;
