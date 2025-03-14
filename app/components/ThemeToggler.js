// app/(components)/ThemeToggler.js
'use client';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ThemeToggler = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-360, 0, 360]);
  const iconColor = useTransform(
    x,
    [-100, 0, 100],
    ['rgb(203 213 225)', 'rgb(156 163 175)', 'rgb(250 204 21)']
  );

  const handleToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Animate the icon smoothly (using set)
    x.set(newTheme === 'dark' ? 100 : -100); // Changed .start() to .set()
  };

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      type="button"
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      onClick={handleToggle}
      style={{ rotate }}
    >
      <motion.span style={{ color: iconColor }}>
        {resolvedTheme === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggler;
