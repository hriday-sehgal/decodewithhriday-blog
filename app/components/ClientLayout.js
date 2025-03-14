// app/(components)/ClientLayout.js
'use client'; // This MUST be a client component
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ClientLayout({ children }) {
    const router = useRouter();

    return (
      // No change here!!
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
           <AnimatePresence mode="wait">
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Navbar />
              {children}
              <Footer />
            </motion.div>
          </AnimatePresence>
      </ThemeProvider>
    );
}

