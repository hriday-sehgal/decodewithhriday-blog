'use client';

import ContactForm from '@/components/ContactForm';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ContactClient() {
  const socialCards = [
    {
      name: 'LinkedIn',
      description: 'Professional networking & career queries',
      handle: '/in/hridaysehgal',
      url: 'https://www.linkedin.com/in/hridaysehgal/',
      icon: <FaLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      bgClass: 'bg-blue-50 dark:bg-blue-950/40 border-blue-100/50 dark:border-blue-900/30'
    },
    {
      name: 'GitHub',
      description: 'Repositories, open source & contributions',
      handle: 'hriday-sehgal',
      url: 'https://github.com/hriday-sehgal',
      icon: <FaGithub className="w-5 h-5 text-slate-800 dark:text-white" />,
      bgClass: 'bg-slate-100 dark:bg-zinc-800 border-slate-200/40 dark:border-zinc-700/50'
    },
    {
      name: 'Email Address',
      description: 'Direct inquiries & collaborations',
      handle: 'hriday.career@gmail.com',
      url: 'mailto:hriday.career@gmail.com',
      icon: <FaEnvelope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100/50 dark:border-emerald-900/30'
    }
  ];

  return (
    <div className="bg-transparent min-h-screen py-12 px-4 sm:px-6 md:px-8">
      <main className="container mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 sm:text-5xl">
            Get In <span className="gradient-text-primary">Touch</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-zinc-400">
            Have questions, feedback, or collaboration proposals? Fill out the form or reach out directly.
          </p>
        </motion.div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Side: Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 space-y-4"
          >
            {socialCards.map((card) => (
              <a
                key={card.name}
                href={card.url}
                target={card.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={card.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="block p-5 rounded-2xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md hover:border-violet-500/20 dark:hover:border-violet-400/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-xl border group-hover:scale-105 transition-transform duration-200 ${card.bgClass}`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                      {card.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                      {card.description}
                    </p>
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 mt-1 block">
                      {card.handle}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm"
          >
            <ContactForm />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
