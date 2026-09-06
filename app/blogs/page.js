import { client } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from "@/lib/sanity";
import { FaRegClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BlogControls from './BlogControls';

export const metadata = {
  title: 'Blogs Directory | Decode with Hriday',
  description: 'Tutorials, architecture reviews, and discussions around scalable web development and product design.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    type: 'website',
    url: 'https://decodewithhriday.vercel.app/blogs',
    title: 'Blogs Directory | Decode with Hriday',
    description: 'Tutorials, architecture reviews, and discussions around scalable web development and product design.',
  },
};

// Helper function to calculate reading time
const calculateReadingTime = (text) => {
  if (!text) return "0 min read";
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
};

// Build URL path with search params for pagination
const buildPageLink = (pageIndex, resolvedSearchParams) => {
  const params = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      params.set(key, val);
    }
  });
  if (pageIndex <= 0) {
    params.delete('page');
  } else {
    params.set('page', String(pageIndex + 1));
  }
  const queryString = params.toString();
  return `/blogs${queryString ? `?${queryString}` : ''}`;
};

export default async function BlogListingPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(0, parseInt(resolvedSearchParams.page || '1') - 1);
  const searchQuery = resolvedSearchParams.q || '';
  const selectedCategory = resolvedSearchParams.category || null;
  const sortOrder = resolvedSearchParams.sort || 'latest';

  // Fetch all categories
  let allCategories = [];
  try {
    allCategories = await client.fetch(`*[_type == "category"]{title}`);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }

  // Fetch blogs based on filters
  let posts = [];
  let totalPages = 0;
  try {
    const conditions = [];

    if (searchQuery) {
      conditions.push(`(title match "*${searchQuery}*" || excerpt match "*${searchQuery}*" || defined(categories) && categories[]->title match "*${searchQuery}*")`);
    }

    if (selectedCategory) {
      conditions.push(`"${selectedCategory}" in categories[]->title`);
    }

    let countQuery = `count(*[_type == "post"]`;
    if (conditions.length > 0) {
      countQuery += `[${conditions.join(' && ')}]`;
    }
    countQuery += `)`;

    const totalPosts = await client.fetch(countQuery);
    totalPages = Math.ceil(totalPosts / 9); // 9 posts per page

    let query = `*[_type == "post"]`;
    if (conditions.length > 0) {
      query += `[${conditions.join(' && ')}]`;
    }

    query += ` | order(_createdAt ${sortOrder === 'latest' ? 'desc' : 'asc'})`;

    const start = page * 9;
    const end = start + 9;
    query += `[${start}...${end}]`;

    query += `{
      title,
      slug,
      _id,
      mainImage,
      excerpt,
      body,
      "categories": categories[]->title,
      _createdAt
    }`;

    posts = await client.fetch(query);
  } catch (err) {
    console.error("Error fetching posts:", err);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-5xl">
          The Engineering Logbook
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-zinc-400">
          Tutorials, architecture reviews, and discussions around scalable web development and product design.
        </p>
      </div>

      {/* Controls Bar */}
      <BlogControls 
        categories={allCategories}
        currentSearch={searchQuery}
        currentCategory={selectedCategory}
        currentSort={sortOrder}
      />

      {/* Grid Content */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            let readingTime = "0 min read";
            try {
              readingTime = calculateReadingTime(post.body?.map(block => block.children ? block.children.map(child => child.text).join('') : '').join(' '));
            } catch (error) {
              console.error("Error calculating reading time", error);
            }

            return (
              <article key={post._id} className="group flex flex-col h-full bg-white dark:bg-zinc-900/50 rounded-2xl border border-slate-200/50 dark:border-zinc-800 hover:border-violet-500/20 dark:hover:border-violet-400/10 shadow-sm hover:shadow-lg dark:shadow-black/20 transition-all duration-300">
                <Link href={`/blogs/${post.slug.current}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full rounded-t-2xl overflow-hidden border-b border-slate-200/20 dark:border-zinc-800/40 bg-slate-100 dark:bg-zinc-900">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      sizes="(max-w-768px) 100vw, 360px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Meta Info */}
                      <div className="flex items-center space-x-2.5 text-xs text-slate-400 dark:text-zinc-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <FaRegClock className="w-3.5 h-3.5" />
                          <span>{readingTime}</span>
                        </span>
                        <span>&middot;</span>
                        <span>{new Date(post._createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-display font-bold text-slate-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-250 leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {post.categories?.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/30 dark:border-zinc-700/60"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white/40 dark:bg-zinc-900/40">
          <p className="text-slate-500 dark:text-zinc-400">No blog posts match your criteria.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2.5 mt-16">
          {page > 0 ? (
            <Link
              href={buildPageLink(page - 1, resolvedSearchParams)}
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Previous Page"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              disabled
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-slate-655 dark:text-zinc-400 opacity-40 cursor-not-allowed"
              aria-label="Previous Page"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={buildPageLink(i, resolvedSearchParams)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center ${
                page === i
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/10 pointer-events-none'
                  : 'border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
              }`}
            >
              {i + 1}
            </Link>
          ))}
          
          {page < totalPages - 1 ? (
            <Link
              href={buildPageLink(page + 1, resolvedSearchParams)}
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Next Page"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              disabled
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-slate-655 dark:text-zinc-400 opacity-40 cursor-not-allowed"
              aria-label="Next Page"
            >
              <FaChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}