import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ClientLayout from './components/ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://decodewithhriday.vercel.app'),
  title: {
    default: 'Decode with Hriday',
    template: '%s | Decode with Hriday',
  },
  description: 'Uncover the depths of modern web development, software engineering, and product building. Insights and guides by Hriday Sehgal.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://decodewithhriday.vercel.app',
    title: 'Decode with Hriday',
    description: 'Uncover the depths of modern web development, software engineering, and product building. Insights and guides by Hriday Sehgal.',
    siteName: 'Decode with Hriday',
    images: [
      {
        url: '/dwh_new_logo.png',
        width: 512,
        height: 512,
        alt: 'Decode with Hriday',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decode with Hriday',
    description: 'Uncover the depths of modern web development, software engineering, and product building. Insights and guides by Hriday Sehgal.',
    images: ['/dwh_new_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#f8fafc] text-slate-900 dark:bg-[#030712] dark:text-zinc-100 transition-colors duration-300 min-h-screen flex flex-col`} suppressHydrationWarning>
        {/* Google Tag Manager - Head Script */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; 
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TQPKWCMG');
          `}
        </Script>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
