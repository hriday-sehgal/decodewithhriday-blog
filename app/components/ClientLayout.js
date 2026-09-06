// app/components/ClientLayout.js
'use client';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <div className="flex flex-col min-h-screen relative overflow-x-hidden grid-background">
        <Navbar />
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-grow flex flex-col w-full relative z-10"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
