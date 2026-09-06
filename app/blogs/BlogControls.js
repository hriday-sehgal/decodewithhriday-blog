'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export default function BlogControls({ categories, currentSearch, currentCategory, currentSort }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchVal, setSearchVal] = useState(currentSearch);

  // Sync state if prop changes (e.g. back button navigation)
  useEffect(() => {
    setSearchVal(currentSearch);
  }, [currentSearch]);

  // Debounce search update
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchVal !== currentSearch) {
        updateParams({ q: searchVal, page: 1 });
      }
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [searchVal, currentSearch]);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    const newCategory = currentCategory === category ? null : category;
    updateParams({ category: newCategory, page: 1 });
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Search */}
      <div className="relative max-w-xl mx-auto md:mx-0 w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
          <FaSearch className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search articles, tags or topics..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="pl-11 pr-4 py-3 bg-white/60 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500"
        />
      </div>

      {/* Categories Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-thin max-w-full">
          <button
            onClick={() => updateParams({ category: null, page: 1 })}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              currentCategory === null
                ? 'bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-500/10'
                : 'bg-white/60 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-350 dark:hover:border-zinc-700 hover:text-slate-800 dark:hover:text-zinc-200'
            }`}
          >
            All Topics
          </button>
          {categories.map((category) => (
            <button
              key={category.title}
              onClick={() => handleCategoryChange(category.title)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                currentCategory === category.title
                  ? 'bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-500/10'
                  : 'bg-white/60 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-350 dark:hover:border-zinc-700 hover:text-slate-800 dark:hover:text-zinc-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Sort Buttons */}
        <div className="flex items-center space-x-1 border border-slate-200/60 dark:border-zinc-800/80 p-1 rounded-xl bg-slate-100/50 dark:bg-zinc-900/40 w-fit self-end md:self-center">
          <button
            onClick={() => updateParams({ sort: 'latest', page: 1 })}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentSort === 'latest'
                ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-sm'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => updateParams({ sort: 'oldest', page: 1 })}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentSort === 'oldest'
                ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-sm'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
            }`}
          >
            Oldest
          </button>
        </div>
      </div>
    </div>
  );
}
