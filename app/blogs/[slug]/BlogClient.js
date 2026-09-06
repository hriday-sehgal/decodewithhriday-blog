// app/blogs/[slug]/BlogClient.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from "@/lib/sanity";
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaReddit, FaRegCopy, FaCheck, FaUser } from 'react-icons/fa';
import SubscribeForm from '@/components/SubscribeForm';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { client } from '@/lib/sanity';

// Dynamic Code Block Component with Copy Action
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-zinc-950 dark:bg-zinc-900/90 overflow-hidden shadow-inner relative group">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-200/10 dark:border-zinc-800/80 bg-zinc-900/40 text-xs text-zinc-400 font-mono uppercase select-none">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 hover:text-zinc-200 transition-colors font-sans font-medium"
        >
          {copied ? (
            <>
              <FaCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <FaRegCopy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm leading-6">
        <code className="text-zinc-100 font-mono block select-text">{code}</code>
      </pre>
    </div>
  );
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 leading-8 text-[1.05rem] text-slate-700 dark:text-zinc-300">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-zinc-100 mt-10 mb-5">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-display font-semibold tracking-tight text-slate-900 dark:text-zinc-100 mt-8 mb-4 pb-1 border-b border-slate-200/50 dark:border-zinc-800/50">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-display font-semibold tracking-tight text-slate-900 dark:text-zinc-100 mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-display font-semibold text-slate-900 dark:text-zinc-100 mt-5 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-violet-500 bg-violet-500/5 dark:bg-violet-500/10 pl-6 pr-4 py-3 rounded-r-lg italic my-8 text-slate-800 dark:text-zinc-200 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-violet-600 dark:text-violet-400 underline decoration-violet-500/30 underline-offset-4 hover:decoration-violet-500 transition-colors font-medium">
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside mb-6 pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside mb-6 pl-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7 text-[1.02rem] text-slate-700 dark:text-zinc-300">{children}</li>,
    number: ({ children }) => <li className="leading-7 text-[1.02rem] text-slate-700 dark:text-zinc-300">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="relative aspect-[16/10] w-full my-8 rounded-2xl overflow-hidden border border-slate-200/40 dark:border-zinc-800/50 shadow-md">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Article Image'}
            fill
            sizes="(max-w-768px) 100vw, 700px"
            className="object-cover"
          />
        </div>
      );
    },
    code: ({ value }) => {
      return <CodeBlock language={value.language} code={value.code} />;
    },
  },
};

export default function BlogClient({ post, nextPost, prevPost }) {
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const shareUrl = window.location.href;
    let shareLink;
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + shareUrl)}`;
        break;
      case 'reddit':
        shareLink = `http://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`;
        break;
      default:
        return;
    }
    window.open(shareLink, '_blank', 'noopener,noreferrer');
  };

  if (!post) {
    return <div className="text-center py-20 text-xl font-medium">Loading...</div>;
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 max-w-6xl relative" ref={topRef}>
      {/* Article Header */}
      <header className="max-w-3xl mx-auto text-center mb-10">
        <div className="flex justify-center items-center gap-2 mb-4">
          {post.categories?.map((cat) => (
            <span
              key={cat.title}
              className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/15"
            >
              {cat.title}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 leading-[1.2]">
          {post.title}
        </h1>
      </header>

      {/* Main Immersive Banner */}
      <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200/50 dark:border-zinc-800 shadow-md mb-12 bg-slate-100 dark:bg-zinc-900">
        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.title}
          fill
          priority
          sizes="(max-w-1024px) 100vw, 1100px"
          className="object-cover"
        />
      </div>

      {/* 3-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Floating Shares */}
        <aside className="lg:col-span-2 lg:sticky lg:top-24 hidden lg:flex flex-col space-y-3.5 items-center justify-center p-4 border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest select-none">
            Share
          </span>
          <button
            onClick={() => handleShare('facebook')}
            className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            title="Share on Facebook"
          >
            <FaFacebook className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            title="Share on X (Twitter)"
          >
            <FaTwitter className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            title="Share on LinkedIn"
          >
            <FaLinkedin className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            title="Share on WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" />
          </button>
          
          <div className="w-full border-t border-slate-200/60 dark:border-zinc-800 my-1" />

          <button
            onClick={handleCopyLink}
            className={`p-3 rounded-xl border transition-all duration-200 ${
              copied
                ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500'
                : 'border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
            }`}
            title="Copy Link"
          >
            {copied ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
          </button>
        </aside>

        {/* Center Column: Article content */}
        <article className="lg:col-span-7 prose dark:prose-invert max-w-full">
          <PortableText value={post.body} components={portableTextComponents} />

          {/* Inline Mobile Share Controls */}
          <div className="lg:hidden border-t border-slate-200/60 dark:border-zinc-800 pt-6 mt-8">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 block mb-3">
              Share this article:
            </span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <FaFacebook className="text-blue-600 w-3.5 h-3.5" /> <span>Facebook</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <FaTwitter className="text-zinc-800 dark:text-zinc-200 w-3.5 h-3.5" /> <span>X</span>
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <FaLinkedin className="text-blue-700 w-3.5 h-3.5" /> <span>LinkedIn</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              >
                {copied ? <FaCheck className="text-emerald-500 w-3.5 h-3.5" /> : <FaRegCopy className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>

          {/* Article Navigations */}
          <div className="border-t border-slate-200/60 dark:border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevPost ? (
              <Link
                href={`/blogs/${prevPost.slug.current}`}
                className="w-full sm:w-auto p-4 rounded-2xl border border-slate-200/50 dark:border-zinc-800 hover:border-violet-500/20 dark:hover:border-violet-400/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300 flex items-center group"
              >
                <ChevronLeftIcon className="w-5 h-5 mr-3 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">
                    Previous
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 line-clamp-1">
                    {prevPost.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="w-full sm:w-auto opacity-0" />
            )}

            {nextPost ? (
              <Link
                href={`/blogs/${nextPost.slug.current}`}
                className="w-full sm:w-auto p-4 rounded-2xl border border-slate-200/50 dark:border-zinc-800 hover:border-violet-500/20 dark:hover:border-violet-400/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300 flex items-center justify-end text-right group ml-auto"
              >
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block">
                    Next
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 line-clamp-1">
                    {nextPost.title}
                  </span>
                </div>
                <ChevronRightIcon className="w-5 h-5 ml-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div className="w-full sm:w-auto opacity-0" />
            )}
          </div>

          {/* Newsletter Inline Form */}
          <div className="mt-16">
            <SubscribeForm />
          </div>
        </article>

        {/* Right Column: Sticky Author & Related */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-8">
          {/* Author Block */}
          <Link href="/about" className="block p-5 border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-sm hover:border-violet-500/20 dark:hover:border-violet-400/20 hover:shadow transition-all group">
            <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest select-none mb-3">
              Written By
            </h3>
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 group-hover:scale-105 transition-transform duration-255 shrink-0 shadow-inner">
                <FaUser className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 group-hover:text-violet-650 dark:group-hover:text-violet-400 transition-colors">
                  {post.author?.name}
                </p>
                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
                  Published {publishDate}
                </p>
              </div>
            </div>
          </Link>

          {/* Related Articles Stack */}
          <div className="p-5 border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest select-none mb-4">
              You May Also Like
            </h3>
            <RelatedPosts categories={post.categories?.map((cat) => cat.title)} currentPostSlug={post.slug.current} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function RelatedPosts({ categories, currentPostSlug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setLoading(true);
      try {
        let query;
        if (categories && categories.length > 0) {
          query = `*[_type == "post" && slug.current != $currentPostSlug && (`;
          const categoryConditions = categories.map(
            (category) => `"${category}" in categories[]->title`
          );
          query += categoryConditions.join(" || ");
          query += `)] | order(_createdAt desc)[0...3] {
            title,
            slug,
            mainImage,
            excerpt,
            "categories": categories[]->title,
            _id
          }`;
        } else {
          query = `*[_type == "post" && slug.current != $currentPostSlug] | order(_createdAt desc)[0...3] {
            title,
            slug,
            mainImage,
            excerpt,
            "categories": categories[]->title,
            _id
          }`;
        }

        const posts = await client.fetch(query, { currentPostSlug });
        setRelatedPosts(posts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [categories, currentPostSlug]);

  if (loading) {
    return <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={idx} className="flex flex-col space-y-2 animate-pulse">
          <div className="h-20 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-4/5" />
        </div>
      ))}
    </div>;
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return <p className="text-xs text-slate-400 dark:text-zinc-500">No related articles found.</p>;
  }

  return (
    <div className="space-y-5">
      {relatedPosts.map((relatedPost) => (
        <div key={relatedPost._id} className="group border-b border-slate-200/50 dark:border-zinc-800/80 last:border-0 pb-4 last:pb-0">
          <Link href={`/blogs/${relatedPost.slug.current}`} className="flex space-x-3.5 items-center">
            <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-200/40 dark:border-zinc-800/60 bg-slate-100 dark:bg-zinc-900 shrink-0">
              <Image
                src={urlFor(relatedPost.mainImage).url()}
                alt={relatedPost.title}
                fill
                sizes="64px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
                {relatedPost.title}
              </h4>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
