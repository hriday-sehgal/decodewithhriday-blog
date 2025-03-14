// app/blogs/page.js
'use client';

import { client } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from "@/lib/sanity";
import { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useSearchParams } from 'next/navigation';

// Helper function to calculate reading time
const calculateReadingTime = (text) => {
  if (!text) return "0 min read";
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
};


export default function BlogListingPage() {
  const [posts, setPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // Only ONE selected category
  const [sortOrder, setSortOrder] = useState('latest');
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();

  // Get initial category from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
         setSelectedCategory(null); //Explicitly set to null if no category
    }
  }, [searchParams]);


  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await client.fetch(`*[_type == "category"]{title}`);
      setAllCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let query = `*[_type == "post"]`;
        const conditions = [];

        // Search filtering
        if (searchQuery) {
          conditions.push(`(title match "*${searchQuery}*" || excerpt match "*${searchQuery}*" || defined(categories) && categories[]->title match "*${searchQuery}*")`);
        }

        // Category filtering (Simplified for single category)
        if (selectedCategory) {
          conditions.push(`"${selectedCategory}" in categories[]->title`);
        }

        if (conditions.length > 0) {
          query += `[${conditions.join(' && ')}]`;
        }


        let countQuery = `count(*[_type == "post"]`;
        if (conditions.length > 0) {
          countQuery += `[${conditions.join(' && ')}]`;
        }
        countQuery += `)`;

        const totalPosts = await client.fetch(countQuery);
        setTotalPages(Math.ceil(totalPosts / 10));

        query += ` | order(_createdAt ${sortOrder === 'latest' ? 'desc' : 'asc'})`;

        const start = page * 10;
        const end = start + 10;
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
        const newPosts = await client.fetch(query);
        setPosts(newPosts);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [page, searchQuery, selectedCategory, sortOrder]);


  // Simplified category handling
    const handleCategoryChange = (category) => {
    setPage(0);
    // Toggle selection:  If it's already selected, deselect.  Otherwise, select.
    const newCategory = selectedCategory === category ? null : category;  // Use null for "no selection"
    setSelectedCategory(newCategory);

    // Update URL Parameters
     const newParams = new URLSearchParams(); //Start fresh
     if (newCategory) {
       newParams.set('category', newCategory); // Set or remove category.  Use .set, not .append
     } //else, we don't set anything

        const newUrl = `/blogs?${newParams.toString()}`;
     window.history.pushState({}, '', newUrl);  // Update browser history
};


  const handleSearchChange = (e) => {
    setPage(0);
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (order) => {
    setPage(0);
    setSortOrder(order);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Fade><h1 className="text-3xl font-bold mb-8">All Blog Posts</h1></Fade>

      {/* Search Bar (Top) */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filters and Sort (Next Line) */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => handleCategoryChange(category.title)}
              className={`px-4 py-2 rounded-full text-sm
                ${selectedCategory === category.title
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
                } transition-colors`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="flex gap-4 ml-auto">
          <button
            onClick={() => handleSortChange('latest')}
            className={`px-4 py-2 rounded-md ${sortOrder === 'latest' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortChange('oldest')}
            className={`px-4 py-2 rounded-md ${sortOrder === 'oldest' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
          >
            Oldest
          </button>
        </div>
      </div>


      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          let readingTime = "0 min read";
          try {
            readingTime = calculateReadingTime(post.body?.map(block => block.children ? block.children.map(child => child.text).join('') : '').join(' '));
          } catch (error) {
            console.error("Error calculating reading time", error);
          }

          return (
            <Fade key={post._id} triggerOnce>
              <Link href={`/blogs/${post.slug.current}`} >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      objectFit='cover'
                      objectPosition='center'
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{readingTime}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{post.excerpt}</p>
                    <div className="flex flex-wrap mt-2">
                      {post.categories?.map((category) => (
                        <span
                            key={category}
                          className="mr-2 mb-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </Fade>
          );
        })}
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 mx-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 mx-1 rounded-md transition-colors ${page === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
          className="px-4 py-2 mx-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
