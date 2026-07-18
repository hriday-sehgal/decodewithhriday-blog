// app/components/Footer.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/hridaysehgal/' },
    { name: 'GitHub', icon: <FaGithub className="w-5 h-5" />, url: 'https://github.com/hriday-sehgal/' },
    { name: 'Email', icon: <FaEnvelope className="w-5 h-5" />, url: 'mailto:hriday.career@gmail.com' },
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <footer className="relative mt-auto border-t border-slate-200/50 dark:border-zinc-800/80 bg-white/40 dark:bg-[#030712]/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Brand Segment */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 w-fit">
              <div className="relative w-8 h-8">
                <Image
                  src="/dwh_new_logo.png"
                  alt="Decode with Hriday Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Decode with Hriday
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Uncover the depths of generative AI, Hybrid RAG systems, multi-agent frameworks, and full-stack engineering. Engineering logs by Hriday Sehgal.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                  className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3 flex flex-col space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.url}>
                    <span className="text-sm text-slate-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="col-span-1 md:col-span-4 flex flex-col space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy-policy">
                  <span className="text-sm text-slate-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-400 dark:text-zinc-500 leading-relaxed block">
                  This blog does not track users or store personal info, except emails provided explicitly via forms.
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200/50 dark:border-zinc-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-zinc-500">
            &copy; {currentYear} Decode with Hriday. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
