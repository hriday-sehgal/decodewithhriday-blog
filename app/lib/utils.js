// app/lib/utils.js
import { client } from './sanity';
import { urlFor } from './sanity';

export async function getFeaturedPosts() {
    const query = `*[_type == "post"] | order(_createdAt desc)[0...4]{
        _id, // Get the _id!
        title,
        "slug": slug.current, //MODIFIED THIS
        mainImage,
        author->{name},
        categories[]->{title},
        publishedAt,
        excerpt,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }`;

    const posts = await client.fetch(query);

    const formattedPosts = posts.map((post) => ({
        id: post._id,
        title: post.title,
        description: post.excerpt,
        author: post.author?.name || "Unknown Author",
        readingTime: `${post.estimatedReadingTime} min read`,
        imageUrl: urlFor(post.mainImage).width(600).height(400).url(),
        tags: post.categories?.map((category) => category?.title) || [],
        slug: post.slug  // This is  the issue
    }));

    return formattedPosts;
}
