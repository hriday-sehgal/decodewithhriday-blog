// app/(components)/Navbar.js
'use client';
import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
      router.refresh();
    } else {
      console.error('Error signing out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

    // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.relative.group')) { // Correct selector
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [router]);



  return (
    <nav
      className={`sticky top-0 z-50 py-4 px-6 md:px-12 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 dark:bg-gray-900/70 shadow-md'
          : 'bg-white/90 dark:bg-gray-900/90'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <Link href="/">
          <Image
            src="/DWH_logo.png"
            alt="Blog Logo"
            width={50}
            height={50}
            className="hover:scale-105 transition-transform"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu & Mobile Menu (Conditional Rendering) */}
        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:space-x-8 mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            <Link href="/">
              <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                Home
              </span>
            </Link>
            <Link href="/blogs">
              <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                Blogs
              </span>
            </Link>
            <Link href="/premium">
              <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                Premium
              </span>
            </Link>
            <Link href="/about">
              <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                About
              </span>
            </Link>
            <Link href="/donate">
              <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                Support
              </span>
            </Link>
            <Link href="/contact">
              <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                Contact
              </span>
            </Link>

            {isLoggedIn ? (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 py-2 md:py-0"
                  onClick={toggleDropdown}
                >
                  <span>Profile</span>
                </button>
                <div
                  className={`absolute ${
                    dropdownOpen ? 'block' : 'hidden'
                  } bg-white dark:bg-gray-800 shadow-lg rounded-md min-w-[150px] right-0 mt-2`}
                >
                  <Link href="/profile">
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </span>
                  </Link>
                  {/* <Link href="/payments">
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Payments
                    </span>
                  </Link>
                  <Link href="/membership">
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Membership
                    </span>
                  </Link> */}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <Link href="/login">
                  <span className="block hover:text-blue-500 dark:hover:text-blue-400 py-2 md:py-0">
                    Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors block mt-2 md:mt-0">
                    Signup
                  </span>
                </Link>
              </div>
            )}
            <ThemeToggler />
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;

