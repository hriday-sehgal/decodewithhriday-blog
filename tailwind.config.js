/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include .mdx if you use MDX
    // No need to include pages or components separately, app is enough
  ],
  darkMode: 'class', // <--- THIS IS IMPORTANT!
  theme: {
    extend: {},
  },
  plugins: [],
};
