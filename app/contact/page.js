// app/contact/page.js
import ContactForm from '@/components/ContactForm';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';

export const metadata = {
  title: 'Decode with Hriday | Contact',
  description: 'Conatct Us',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">

      <main className="container mx-auto px-6 py-12 flex-grow">
        <Fade>
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/*Left*/}
          <div className="md:pr-8">
            <Fade>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have questions, feedback, or collaboration ideas?  We'd love to hear from you!
              </p>

              <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>

              <div className="flex space-x-6 mb-8">
                <Link href="https://www.linkedin.com/in/hridaysehgal/" legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                    <FaLinkedin className="text-3xl" />
                  </a>
                </Link>
                {/*github link */}
                <Link href="https://github.com/hriday-sehgal" legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    <FaGithub className="text-3xl" />
                  </a>
                </Link>


              </div>

              <h3 className="text-xl font-semibold mb-4">Email</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                For inquiries, please email us at:
                <br />
                <a href="mailto:hriday.career@gmail.com" className="text-blue-500 hover:underline">
                  hriday.career@gmail.com
                </a>
              </p>
            </Fade>
          </div>

          {/* Right */}

          <div className="md:pl-8">
            <Fade direction='right' delay={400}>
              <ContactForm />
            </Fade>
          </div>

        </div>

      </main>
    </div>
  );
}
