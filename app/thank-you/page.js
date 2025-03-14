// app/thank-you/page.js
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes'; // Import useTheme
import { useEffect } from 'react';

export default function ThankYouPage() {
    const { theme, setTheme } = useTheme();

    // Optional: Set a default theme if none is set (e.g., on initial load)
    useEffect(() => {
      if (!theme) {
          setTheme('light'); // Or 'system' if you prefer to respect the user's OS setting
      }
    }, [theme, setTheme]);


  return (
    <div className={`${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
    } min-h-screen  flex items-center justify-center transition-colors duration-200`}>

      <div className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-2xl p-8 md:p-12 max-w-3xl w-full mx-4`}>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/success-check.png" // Use an SVG
            alt="Success Checkmark"
            width={100}
            height={100}
            className="checkmark transition-all duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
       <style jsx>{`
          .checkmark {
            fill: ${theme === 'dark' ? '#6ee7b7' : '#22c55e'};
          }
      `}</style>


        <h1 className={`${
          theme === 'dark' ? 'text-green-400' : 'text-green-600'
        } text-3xl md:text-5xl font-extrabold text-center mb-4`}>
          Payment Successful!
        </h1>

        <p className={`${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        } text-lg md:text-2xl  text-center mb-8`}>
          ✅ Thank you for your purchase! Your premium access is being processed.
        </p>

        <div className={`${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        } border-t  pt-8 `}>
          <h2 className={`${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          } text-2xl font-semibold mb-6 `}>What's Next?</h2>

          <ul className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } list-none  space-y-3`}>
            <li>
              <span className={`${
                theme === 'dark' ? 'text-green-400' : 'text-green-500'
              } mr-2`}>✓</span>
              Your access will be activated shortly after verification. This may take some time.
            </li>
            <li>
              <span className={`${
                theme === 'dark' ? 'text-green-400' : 'text-green-500'
              } mr-2`}>✓</span>
               You'll receive a confirmation email with details about your premium access. Be sure to check your spam/junk folder.
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blogs">
            <button className={`${
              theme === 'dark'
                ? 'bg-blue-700 hover:bg-blue-800 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2  focus:ring-opacity-50 transition duration-300 shadow-md hover:shadow-lg focus:ring-blue-500 `}>
              Explore Blogs
            </button>
          </Link>
          <Link href="/contact">
          <button className={`${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          } font-bold py-3 px-8 rounded-full focus:outline-none focus:ring-2  focus:ring-opacity-50 transition duration-300 shadow-md hover:shadow-lg  focus:ring-gray-500`}>
            Contact Support
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
