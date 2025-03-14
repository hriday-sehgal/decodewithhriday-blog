// app/page.js
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedPosts } from '@/lib/utils';
import { Fade } from 'react-awesome-reveal';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Import the icons

export const metadata = {
    title: 'Decode with Hriday | Home',
    description: 'Read insightful tech articles',
    icons: {
      icon: '/favicon.ico',
    },
  };

export default async function HomePage() {
    const featuredPosts = await getFeaturedPosts();

    return (
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-700 dark:to-gray-900 py-10 px-4 sm:py-16 sm:px-6 md:px-12 text-center relative overflow-hidden">
                <div className="z-10 relative">
                    <Fade direction="up" duration={800} triggerOnce>
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-4">
                            Unlock the World of Knowledge
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-10">
                            Your gateway to insightful articles and engaging stories.
                        </p>
                    </Fade>
                    <Fade direction="up" duration={800} delay={200} triggerOnce>
                        <Link href="/blogs" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full transition-colors hover:scale-105">
                            Read Blogs
                        </Link>
                    </Fade>
                </div>
                {/* Abstract background shapes */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-blue-300 dark:bg-blue-800 rounded-full blur-3xl opacity-50 top-1/4 left-1/4"></div>
                    <div className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-indigo-300 dark:bg-indigo-800 rounded-full blur-3xl opacity-50 bottom-1/4 right-1/4"></div>
                </div>
            </section>

            {/* Featured Blogs Section */}
            <section className="py-8 px-4 sm:py-16 sm:px-6 md:px-12">
                <Fade direction="up" triggerOnce>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">Featured Blogs</h2>
                </Fade>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                    {featuredPosts.map((blog, index) => (
                        <Fade key={blog.id} direction="up" delay={index * 100} triggerOnce>
                            <Link href={`/blogs/${blog.slug}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                <div> {/* Removed the <a> tag */}
                                    <div className="relative h-32 sm:h-48 w-full">
                                        <Image
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                            className="rounded-t-lg"
                                        />
                                    </div>
                                    <div className="p-3 sm:p-4">
                                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{blog.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 line-clamp-4">{blog.description}</p>
                                        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">
                                            <span>{blog.author}</span>
                                            <span className="mx-1 sm:mx-2">·</span>
                                            <span>{blog.readingTime}</span>
                                        </div>
                                        <div className="flex flex-wrap">
                                            {blog.tags.map((tag) => (
                                                <span key={tag} className="mr-1 mb-1 sm:mr-2 sm:mb-2 px-1 py-0.5 sm:px-2 sm:py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm hover:bg-blue-500 hover:text-white transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div> {/* End of the div that replaced the <a> tag */}
                            </Link>
                        </Fade>
                    ))}
                </div>
                <Fade direction="up" delay={300} triggerOnce>
                    <div className="text-center mt-6 sm:mt-10">
                        <Link href="/blogs" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full transition-colors hover:scale-105">
                            All Blogs
                        </Link>
                    </div>
                </Fade>
            </section>

            {/* Premium Section */}
            <section className="py-8 px-4 sm:py-16 sm:px-6 md:px-12 bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto text-center">
                    <Fade direction="up" triggerOnce>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Unlock Premium Content</h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-8">
                            Support the creator and get access to exclusive features.
                        </p>
                    </Fade>
                    <Fade direction="up" triggerOnce>
                        <ul className="list-disc list-inside text-left text-gray-600 dark:text-gray-300 mb-4 sm:mb-8 space-y-2 sm:space-y-3 md:max-w-2xl mx-auto">
                            <li><span className="font-bold">✓</span> Exclusive articles and tutorials</li>
                            <li><span className="font-bold">✓</span> Ad-free reading experience</li>
                            <li><span className="font-bold">✓</span> Early access to new content</li>
                            <li><span className="font-bold">✓</span> Direct support for the creator</li>
                        </ul>
                    </Fade>
                    <Fade direction="up" triggerOnce>
                        <div>
                            <Link href="/premium" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full transition-colors hover:scale-105">
                                Go Premium
                            </Link> &nbsp;
                            <Link href="/donate" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full transition-colors hover:scale-105">
                                Support My Work
                            </Link>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-8 px-4 sm:py-16 sm:px-6 md:px-12">
                <div className="container mx-auto text-center">
                    <Fade direction="up" triggerOnce>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">About Me</h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-8">
                            I'm a passionate blogger sharing my insights on various topics. I love exploring new ideas and
                            connecting with readers like you.
                        </p>
                    </Fade>

                    <Fade direction="up" delay={200} triggerOnce>
                        <div className="flex flex-col sm:flex-row justify-center items-center  sm:space-x-4 mb-4 sm:mb-8">
                            <Link href="https://www.linkedin.com/in/hridaysehgal/" className="text-blue-500 hover:text-blue-600 transition-colors mb-2 sm:mb-0">
                                <FaLinkedin className="text-xl sm:text-2xl" />
                            </Link>
                            <Link href="https://github.com/hriday-sehgal/" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors mb-2 sm:mb-0">
                                <FaGithub className="text-xl sm:text-2xl" />
                            </Link>
                            <Link href="mailto:hriday.career@gmail.com" className="text-green-500 hover:text-green-600 transition-colors">
                                <FaEnvelope className="text-xl sm:text-2xl" />
                            </Link>
                        </div>
                    </Fade>
                    <Fade direction="up" delay={400} triggerOnce>
                        <div>
                            <Link href="/about" className="inline-block bg-gray-700 dark:bg-gray-200 hover:bg-gray-800 dark:hover:bg-gray-100 dark:text-gray-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full transition-colors hover:scale-105">
                                Learn More
                            </Link>
                        </div>
                    </Fade>
                </div>
            </section>
        </main>
    );
};
