// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css'
import ClientLayout from './components/ClientLayout'; 


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Decode with Hriday',
  description: 'Welcome to my Blog Website',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {

    return (
      <html lang="en" suppressHydrationWarning>
         <head>
       
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
        <body className={inter.className} suppressHydrationWarning>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>

    );
}
