// app/components/ThemeToggler.js
'use client';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const ThemeToggler = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 animate-pulse border border-slate-200/40 dark:border-zinc-800/80" />;
  }

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2.5 rounded-xl border border-slate-200/50 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:shadow dark:shadow-black/20 text-slate-700 dark:text-zinc-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ y: 15, opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: -15, opacity: 0, rotate: -45, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            {resolvedTheme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-amber-400 stroke-[1.8]" />
            ) : (
              <MoonIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[1.8]" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default ThemeToggler;
