// app/(components)/Footer.js
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Image

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-100 dark:bg-gray-900 py-8 mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left: Logo and Tagline */}
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
          <Link href="/">
            <Image
              src="/DWH_logo.png"  // Path to your logo. Make sure it exists!
              alt="Decode with Hriday Logo"
              width={50}   // Adjust as needed
              height={50}  // Adjust as needed, maintain aspect ratio
              className="inline-block" // Important for proper alignment
            />
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
          Decode with Hriday | Uncover. Understand. Apply.
            </p>
           
          </div>

          {/* Right: Links (Horizontal) */}
          <div className="w-full md:w-auto text-center md:text-right">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
              <li>
                <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 dark:hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-blue-500 dark:hover:text-blue-400">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/premium" className="hover:text-blue-500 dark:hover:text-blue-400">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-blue-500 dark:hover:text-blue-400">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-500 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright (Centered at the bottom) */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Decode with Hriday. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
