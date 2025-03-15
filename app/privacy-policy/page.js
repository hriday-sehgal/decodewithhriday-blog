// app/privacy-policy/page.js
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';

export const metadata = {
  title: 'Decode with Hriday | Privacy Policy',
  description: 'Privacy Policy',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdatedDate = "14 March, 2025"; //  Update this!
  const contactEmail = "hriday.career@gmail.com";   //  your contact email.
  const blogURL = "https://decodewithhriday.vercel.app/"; 

  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
       
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy for Decode with Hriday</h1>
        
    
           <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-12">Last Updated: {lastUpdatedDate}</p>

        <div className="prose prose-lg dark:prose-invert mx-auto">

          <p>
            Welcome to Decode with Hriday ("we," "our," "us"). Your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your personal information when you visit our website.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect two types of information:</p>

          <h3>a) Personal Information:</h3>
          <ul>
            <li>Name (if provided through forms)</li>
            <li>Email address (for subscriptions, contact forms, or premium content access)</li>
            <li>Payment details (processed securely via third-party services like Razorpay)</li>
          </ul>

          <h3>b) Non-Personal Information:</h3>
          <ul>
            <li>Browser type and device information</li>
            <li>IP address and location (if analytics tools are used)</li>
            <li>Cookies and tracking data</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We may use your information to:</p>
          <ul>
            <li>Provide and improve our content and services</li>
            <li>Process payments for premium content</li>
            <li>Send newsletters or updates (only if you opt-in)</li>
            <li>Monitor and analyze site traffic with Google Analytics</li>
            <li>Enhance website security and prevent fraud</li>
          </ul>

          <h2>3. Cookies &amp; Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience. You can modify your
            browser settings to block cookies, but some features of the website may not function properly.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>We may use third-party services such as:</p>
          <ul>
            <li>
              <strong>Supabase</strong> (for authentication and database management)
            </li>
            <li>
              <strong>Sanity CMS</strong> (for content management)
            </li>
            <li>
              <strong>Razorpay</strong> (for payment processing)
            </li>
            <li>
              <strong>Google Analytics</strong> (for tracking site performance)
            </li>
          </ul>
          <p>These services have their own privacy policies, and we encourage you to review them.</p>

          <h2>5. Data Security</h2>
          <p>
            We implement security measures to protect your data, including encryption and secure databases. However, no
            method of data transmission is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Ask for corrections or deletion of your data</li>
            <li>Opt out of email communications</li>
            <li>Disable cookies in your browser settings</li>
          </ul>
          <p>
            To make such requests, contact us at{' '}
            <a href={`mailto:${contactEmail}`} className="text-blue-500 hover:underline">
              {contactEmail}
            </a>.
          </p>

          <h2>7. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            "Last Updated" date.
          </p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${contactEmail}`} className="text-blue-500 hover:underline">
              {contactEmail}
            </a>
            <br />
            <strong>Website:</strong>{' '}
            <Link href={blogURL} legacyBehavior>
                <a  target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {blogURL}
                </a>
               </Link>
          </p>

          <p>Thank you for visiting Decode with Hriday!</p>
        </div>
      
      </div>
    </div>
  );
}