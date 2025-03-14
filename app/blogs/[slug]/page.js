// app/blogs/[slug]/page.js (Changes for next/prev post logic)
import { client } from '@/lib/sanity';
import BlogClient from './BlogClient';

export default async function BlogPostPage({ params }) {
  const { slug } = params;

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
export const dynamicParams = false;
