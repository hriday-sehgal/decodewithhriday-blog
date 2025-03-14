// app/blogs/[slug]/BlogClient.js
'use client';

import { useState, useRef,useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from "@/lib/sanity";
import Link from 'next/link';
import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaReddit } from 'react-icons/fa'; // Import icons
import { FaRegCopy } from 'react-icons/fa';
import SubscribeForm from '@/components/SubscribeForm';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { client } from '@/lib/sanity';

const components = {
  block: {
    normal: ({ children }) => <p className="text-base leading-7 text-gray-700 dark:text-gray-300">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-3 scroll-m-20">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold my-2 scroll-m-20">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-1 scroll-m-20">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined
      return (
        <Link href={value.href} rel={rel} className="text-blue-500 hover:underline">
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className='mb-2'>{children}</li>,
    number: ({ children }) => <li className='mb-2'>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="relative h-96 w-full my-4">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            fill
            objectFit="contain"
            className='rounded-lg mx-auto'

          />
        </div>

      );
    },
    code: ({ value }) => {
      return (
        <pre data-language={value.language} className='p-4 my-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto'>
          <code className="text-sm  text-gray-800 dark:text-gray-200">
            {value.code}
          </code>
        </pre>
      );
    },
  },
};

export default function BlogClient({ post, nextPost, prevPost }) {
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const topRef = useRef(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  //Function for sharing
    const handleShare = async (platform) => {
    const shareUrl = window.location.href;
     try {
        if (navigator.share) { // Use Web Share API if available
          await navigator.share({
            title: post.title,
            text: post.excerpt,
            url: shareUrl,
          });
         }
          else {  //Fallback
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
                    shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + shareUrl)}`;  //For mobile and web
                    break;
                 case 'reddit':
                    shareLink = `http://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`;
                    break;
                default:
                  return;
              }
             window.open(shareLink, '_blank', 'noopener,noreferrer'); //Open in new Tab
        }

    }   catch (error) {
       console.error('Error sharing:',error)
    }
};

  if (!post) {
    return <div className='text-center py-20 text-xl'>Loading...</div>;
  }


    return (
      <div className="container mx-auto px-4 py-8 relative" ref={topRef}>
   <div className='flex flex-col md:flex-row  gap-8'>
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Share this blog</h2>
             
                  <div className="mt-6">
                         <button onClick={handleCopyLink} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block w-auto">
                               {copied ? "Copied!" : <span>Copy Link <FaRegCopy className='inline ml-1'size={15} /></span> }
                          </button>
                       </div>

                       {/*For Mobile Devices Share*/}
                 <div className="md:hidden mt-4">  {/* Show on mobile, hide on larger screens */}
                 <button
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
                 className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center w-full"
                    >
                    <FaShareAlt className="mr-2" />
                     Share
                   </button>

                         {dropdownOpen && ( // Conditionally display the dropdown
                  <div className="mt-2 space-y-2 w-full">
                    <button onClick={() => handleShare('facebook')} className="flex items-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                         <FaFacebook className="mr-2" /> Facebook
                   </button>
                  <button onClick={() => handleShare('twitter')} className="flex items-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                        <FaTwitter className="mr-2" /> Twitter
                         </button>
                   <button onClick={() => handleShare('linkedin')} className="flex items-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                     <FaLinkedin className="mr-2" /> LinkedIn
                  </button>
                    <button onClick={() => handleShare('whatsapp')} className="flex items-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FaWhatsapp className="mr-2" /> WhatsApp
                 </button>
                    <button onClick={() => handleShare('reddit')} className="flex items-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                   <FaReddit className="mr-2" /> Reddit
                      </button>
               </div>
                  )}
                 </div>

             {/*For desktop*/}

            <div className="mt-6 space-y-2 hidden md:block"> {/* Hide on mobile, show on larger screens  */}
                 <button onClick={() => handleShare('facebook')} className="flex w-full items-center  px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                 <FaFacebook className="mr-2" /> Facebook
                </button>
                <button onClick={() => handleShare('twitter')} className="flex  w-full items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FaTwitter className="mr-2" /> X (Twitter)
                    </button>
               <button onClick={() => handleShare('linkedin')} className="flex  w-full items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaLinkedin className="mr-2" /> LinkedIn
                    </button>
                <button onClick={() => handleShare('whatsapp')} className="flex  w-full items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FaWhatsapp className="mr-2" /> WhatsApp
                   </button>
                   <button onClick={() => handleShare('reddit')} className="flex w-full  items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaReddit className="mr-2" /> Reddit
                   </button>

                </div>
               </div>
        </aside>

        <div className="prose dark:prose-invert w-full md:w-2/4 mx-auto  prose-img:rounded-xl prose-img:mx-auto">
          <article className=''>
            <h1 className="text-3xl font-bold tracking-tight  sm:text-4xl mb-2">{post.title}</h1>
            <div className="relative h-96 w-full my-4 rounded-xl">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                objectFit="cover"
                className='rounded-xl'
              />
            </div>
            <PortableText value={post.body} components={components} />
            <div className="flex justify-between items-center mt-12 mb-16">
              {prevPost ? (
                <Link href={`/blogs/${prevPost.slug.current}`}
                  className="text-blue-500 hover:underline flex items-center transition">

                  <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" /> Previous Post

                </Link>

              ) : (
                <Link href={`/blogs/${post.slug.current}`}
                  className="text-gray-400  flex items-center transition cursor-not-allowed">

                  <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" /> Previous Post

                </Link>
              )}
              {nextPost ? (
                <Link
                  href={`/blogs/${nextPost.slug.current}`}
                  className="text-blue-500 hover:underline flex items-center transition"

                >
                  Next Post <ChevronRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </Link>

              ) : (
                <Link
                  href={`/blogs/${post.slug.current}`}
                  className="text-gray-400  flex items-center transition cursor-not-allowed"

                >
                  Next Post <ChevronRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </Link>
              )}
            </div>


            <SubscribeForm />
          </article>
        </div>


        <aside className="w-full hidden md:block md:w-1/4">
          <div className=''>
            <div className='p-4'>
              <p className="text-lg font-semibold mb-1">{post.author?.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">You may also like</h2>
            <div className="space-y-4">
              <RelatedPosts categories={post.categories?.map((category) => category.title)} currentPostSlug={post.slug.current} />
            </div>
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
          // Fetch posts related by category
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
                    _id  //IMPORTANT
                }`;
        } else {
          // If no categories, fetch the 3 latest posts
          query = `*[_type == "post" && slug.current != $currentPostSlug] | order(_createdAt desc)[0...3] {
                    title,
                    slug,
                    mainImage,
                    excerpt,
                    "categories": categories[]->title,
                    _id //IMPORTANT
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
    return <div>Loading related posts...</div>;
  }
  if (!relatedPosts || relatedPosts.length === 0) { // If not loading, but no posts
    return <div className="text-gray-500">No related posts found.</div>;
  }
  return (
    <>
      {relatedPosts.map((relatedPost) => (
        <div key={relatedPost._id} className="mb-4">  {/* Use a unique key: _id */}
          <Link href={`/blogs/${relatedPost.slug.current}`} legacyBehavior>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <a>
                <div className="relative h-40 w-full">
                  <Image
                    src={urlFor(relatedPost.mainImage).url()}
                    alt={relatedPost.title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold hover:text-blue-600">
                    {relatedPost.title}
                  </h3>
                  <div className="flex flex-wrap mt-2">
                    {relatedPost.categories?.map((category) => (
                      <span
                        key={category}  //  Use category as key (it should be unique within this post)
                        className="mr-2 mb-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

