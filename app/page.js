// app/page.js
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedPosts } from '@/lib/utils';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import SubscribeForm from '@/components/SubscribeForm';

export const revalidate = 60;

export const metadata = {
  title: 'Decode with Hriday | Home',
  description: 'Uncover the depths of modern web development, software engineering, and product building. Insights and guides by Hriday Sehgal.',
};

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();
  const mainFeature = featuredPosts[0];
  const sideFeatures = featuredPosts.slice(1, 4);

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden border-b border-slate-200/40 dark:border-zinc-800/50">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
              AI Engineer & Full Stack Developer
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 mb-6 leading-[1.15]">
            Uncover. Understand. <br />
            <span className="gradient-text-primary">Apply.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Welcome to my digital logbook. I write about building production AI applications, Hybrid RAG pipelines, multi-agent frameworks, and scalable web engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blogs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 text-center"
            >
              Read Articles
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-slate-50 dark:hover:bg-zinc-850/80 text-slate-800 dark:text-zinc-200 font-semibold text-sm transition-all duration-200 backdrop-blur-md text-center"
            >
              About the Author
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-zinc-100">
              Featured Articles
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
              Curated posts on software development and design patterns.
            </p>
          </div>
          <Link
            href="/blogs"
            className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline mt-4 sm:mt-0 flex items-center space-x-1"
          >
            <span>Browse all articles</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Feature Card */}
            {mainFeature && (
              <div className="lg:col-span-7 flex flex-col">
                <Link href={`/blogs/${mainFeature.slug}`} className="group flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/40 dark:border-zinc-800/60 shadow-sm bg-slate-100 dark:bg-zinc-900">
                    <Image
                      src={mainFeature.imageUrl}
                      alt={mainFeature.title}
                      fill
                      sizes="(max-w-768px) 100vw, 700px"
                      priority
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-2xl"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {mainFeature.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/15"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-slate-400 dark:text-zinc-500 self-center">
                      {mainFeature.readingTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-display font-bold text-slate-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
                    {mainFeature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {mainFeature.description}
                  </p>
                </Link>
              </div>
            )}

            {/* Side Secondary Cards Stack */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {sideFeatures.map((blog) => (
                <div key={blog.id} className="border-b border-slate-200/50 dark:border-zinc-800/80 last:border-0 pb-6 last:pb-0">
                  <Link href={`/blogs/${blog.slug}`} className="group grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/40 dark:border-zinc-800/60 bg-slate-100 dark:bg-zinc-900">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        sizes="180px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="col-span-8 flex flex-col">
                      <div className="flex items-center space-x-2">
                        {blog.tags.slice(0, 1).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/40 dark:border-zinc-700/60"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                          {blog.readingTime}
                        </span>
                      </div>
                      <h4 className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 line-clamp-2 leading-snug">
                        {blog.title}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white/40 dark:bg-zinc-900/40">
            <p className="text-slate-500 dark:text-zinc-400">No featured posts found.</p>
          </div>
        )}
      </section>

      {/* Profile & About Teaser */}
      <section className="py-20 px-4 bg-slate-100/50 dark:bg-zinc-900/30 border-y border-slate-200/40 dark:border-zinc-800/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col space-y-5 text-center items-center">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
              Meet the Developer
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-zinc-100">
              Hi, I&apos;m Hriday Sehgal
            </h2>
            <p className="text-sm sm:text-base text-slate-655 dark:text-zinc-400 leading-relaxed max-w-2xl">
              I am an AI Engineer & Full Stack Developer specializing in production-grade LLM architectures, Hybrid RAG pipelines, and web engineering. I build systems that optimize prompt metrics, reduce hallucination gaps, and automate critical workflows.
            </p>
            
            {/* Social handles */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <Link
                href="/about"
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-750 dark:hover:text-violet-300 flex items-center space-x-1"
              >
                <span>My complete profile</span>
                <span>&rarr;</span>
              </Link>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.linkedin.com/in/hridaysehgal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
                >
                  <FaLinkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://github.com/hriday-sehgal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
                >
                  <FaGithub className="w-4.5 h-4.5" />
                </a>
                <a
                  href="mailto:hriday.career@gmail.com"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-455 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
                >
                  <FaEnvelope className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Newsletter Block */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <SubscribeForm />
      </section>
    </main>
  );
}
