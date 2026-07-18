// app/components/Navbar.js
'use client';
import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/70 dark:bg-[#030712]/75 border-b border-slate-200/50 dark:border-zinc-800/80 shadow-sm backdrop-blur-md py-3'
          : 'bg-[#f8fafc]/90 dark:bg-[#030712]/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 hover:scale-105 transition-transform duration-300">
            <Image
              src="/dwh_new_logo.png"
              alt="Decode with Hriday Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent hidden sm:inline-block">
            Decode with Hriday
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <Link key={link.path} href={link.path}>
                <span className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive 
                    ? 'text-violet-600 dark:text-violet-400' 
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100/50 dark:hover:bg-zinc-800/40'
                }`}>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute bottom-[-2px] left-4 right-4 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
          
          <div className="pl-4 border-l border-slate-200 dark:border-zinc-800 ml-2">
            <ThemeToggler />
          </div>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center space-x-3 md:hidden">
          <ThemeToggler />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl border border-slate-200/50 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#030712]/95 border-b border-slate-200/60 dark:border-zinc-800/80 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-2 flex flex-col">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={link.path}>
                      <span className={`block px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                        isActive
                          ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-l-4 border-violet-500 pl-3'
                          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100/50 dark:hover:bg-zinc-800/40'
                      }`}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
