// app/premium/page.js
import Link from 'next/link';
import { FaCheckCircle, FaBookOpen, FaAd, FaClock, FaDownload } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata = {
  title: 'Decode with Hriday | Premium',
  description: 'Premium Membership',
  icons: {
    icon: '/favicon.ico',
  },
};

async function checkUser() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
            data: { user },
        } = await supabase.auth.getUser();
        return user;

}


export default async function PremiumPage() {
    const user = await checkUser();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
        <main className="flex-grow">
      {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-700 dark:to-blue-900 py-20 px-6 md:px-12 text-center relative overflow-hidden">
                <div className="z-10 relative">
                 <Fade direction="up" duration={800} triggerOnce>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                            Unlock Exclusive, High-Value Content
                        </h1>
                         <p className="text-lg md:text-xl text-blue-100 mb-10">
                            Premium Insights & Deep Dives&mdash;Become a Member Today!
                         </p>
                </Fade>
                <Fade direction="up" duration={800} delay={300} triggerOnce>
                        <Link href="#pricing" legacyBehavior>
                            <a className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full transition-colors  hover:scale-105">
                            Subscribe Now
                            </a>
                        </Link>
                  </Fade>
                </div>
            </section>

      {/* Benefits Section */}
            <section className="py-16 px-6 md:px-12" id="benefits">
                <Fade direction="up" triggerOnce>
                    <h2 className="text-3xl font-bold text-center mb-12">Benefits of Going Premium</h2>
                    </Fade>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     <Fade direction="up" delay={100} triggerOnce>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                         <FaBookOpen className="text-4xl text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Exclusive Articles</h3>
                            <p className="text-gray-600 dark:text-gray-300">Get access to in-depth, well-researched content.</p>
                        </div>
                    </Fade>

                     <Fade direction="up" delay={200} triggerOnce>
                          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <FaAd className="text-4xl text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Ad-Free Experience</h3>
                            <p className="text-gray-600 dark:text-gray-300">Enjoy distraction-free reading.</p>
                         </div>
                    </Fade>
                <Fade direction="up"  delay={300} triggerOnce>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <FaClock className="text-4xl text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Early Access</h3>
                     <p className="text-gray-600 dark:text-gray-300">Read premium posts before others.</p>
                    </div>
                    </Fade>
                  <Fade direction="up" delay={400} triggerOnce>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                       <FaDownload className="text-4xl text-blue-500 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Exclusive Downloads</h3>
                        <p className="text-gray-600 dark:text-gray-300">Get premium eBooks, PDFs, or templates.</p>
                    </div>
                   </Fade>
                  </div>
            </section>

      {/* Pricing Section */}
            <section className="bg-gray-200 dark:bg-gray-700 py-16 px-6 md:px-12" id="pricing">
                <Fade direction="up" triggerOnce>
                <h2 className="text-3xl font-bold text-center mb-12">Premium Pricing Plans</h2>
                </Fade>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                     <Fade direction="up" delay={200} triggerOnce>
                        {/* Single Article Plan */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative overflow-hidden">
                            <h3 className="text-2xl font-semibold mb-4">Unlock Single Article</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">Pay once and unlock any premium article of your choice.</p>
                        <p className="text-4xl font-bold text-green-600 mb-6">₹9<span className="text-base font-normal"> / article</span></p>

                        <ul className="list-none space-y-3 mb-8">
                         <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Instant access to a premium article</li>
                            <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Ad-free reading experience</li>
                          <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> One-time payment, no subscriptions</li>
                            <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Exclusive, high-quality insights</li>
                        <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Affordable & flexible – pay only for what you want</li>
                         </ul>
                       <Link href="/blogs?category=Premium Articles" legacyBehavior>
                          <a className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors  hover:scale-105">Checkout Premium Articles</a>
                        </Link>
                    </div>
                    </Fade>
                <Fade direction="up" delay={400} triggerOnce>
                    {/* Lifetime Membership Plan */}
                   <div className="bg-white dark:bg-gray-800  rounded-lg shadow-lg p-8 relative">
                         <h3 className="text-2xl font-semibold mb-4">Lifetime Premium Membership</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Get unlimited access to all premium articles and exclusive content.</p>
                        <p className="text-4xl font-bold text-green-600 mb-6">₹49<span className="text-base font-normal"> (One-Time Payment)</span></p>
                        <ul className="list-none space-y-3 mb-8">
                         <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Unlock All Premium Articles</li>
                         <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Exclusive Long-Form Content</li>
                         <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Ad-Free Experience</li>
                        <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> PDF & Ebook Downloads</li>
                            <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Early Access to New Blogs</li>
                        </ul>
                         <PremiumButton user={user} />

         <div className="absolute top-0 right-0 mt-4 mr-4">
              <span className="px-4 py-1 bg-yellow-500 text-white rounded-full text-sm font-bold">Best Value</span>
           </div>
       </div>
        </Fade>
      </div>

      <div className='text-center text-sm text-gray-400 mt-4'>
          *Prices and value may vary
        </div>
      </section>

      <section className="py-16 px-6 md:px-12" id="testimonials">
      <Fade direction="up" triggerOnce>
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Premium Members Say</h2>
               </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Fade direction="up" duration={500} triggerOnce>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"The exclusive articles are incredibly insightful! The quality and depth are well worth the premium membership."</p>
                       <p className="font-semibold text-gray-900 dark:text-white">- A. Sharma</p>
                   </div>
               </Fade>

                {/* Testimonial 2 */}
          <Fade direction="up" delay={200} duration={500} triggerOnce>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "I love the ad-free experience! It makes reading so much more enjoyable. Plus, the early access is a great perk."
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">- Priya R.</p>
           </div>
         </Fade>

             {/* Testimonial 3 */}
          <Fade direction="up" delay={400} duration={500} triggerOnce>
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
             <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"Becoming a premium member was the best decision! The exclusive downloads alone are worth the price."</p>
             <p className="font-semibold text-gray-900 dark:text-white">- R. Verma</p>
            </div>
             </Fade>
          </div>
</section>


    {/* FAQ Section */}
<section className="py-16 px-6 md:px-12 bg-gray-100 dark:bg-gray-800"  id="faq">
        <Fade direction="up" triggerOnce>
             <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions (FAQ)</h2>
          </Fade>

<div className="max-w-4xl mx-auto space-y-4">
 <Fade direction="up" delay={200} triggerOnce>
     <details className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 open:bg-gray-50 dark:open:bg-gray-600  transition-colors">
        <summary className="font-semibold cursor-pointer">What is included in the Lifetime Premium Membership?</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
            The Lifetime Premium Membership grants you unlimited access to all current and future premium articles, exclusive content,
                an ad-free reading experience, downloadable resources, and early access to new blog posts. It's a one-time payment for continuous access.
                </p>
                </details>
              </Fade>
            <Fade direction="up"  delay={300} triggerOnce>
                <details className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 open:bg-gray-50  dark:open:bg-gray-600 transition-colors">
                        <summary className="font-semibold cursor-pointer">Can I cancel my subscription?</summary>
                   <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Since we offer a Lifetime Premium Membership, which is a one-time payment, there's no recurring subscription
                    to cancel. The Single Article unlock is also a one-time purchase.
                        </p>
        </details>
      </Fade>
   <Fade direction="up" delay={400} triggerOnce>
    <details className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 open:bg-gray-50 dark:open:bg-gray-600  transition-colors">
           <summary className="font-semibold cursor-pointer">How do I access premium content after purchasing?</summary>
         <p className="mt-2 text-gray-600 dark:text-gray-300">
             Once you purchase the <b>Lifetime Premium Membership</b>, the website should <b>automatically</b> unlock all applicable benefits without further actions. If you are logged-out, then you need to first log-in from the same account through which you made a membership purchase.
                For Single Article purchases, the purchased article will be unlocked automatically.
                    </p>
    </details>
  </Fade>

  <Fade direction="up" delay={500} triggerOnce>
    <details className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 open:bg-gray-50  dark:open:bg-gray-600 transition-colors">
     <summary className="font-semibold cursor-pointer">Are the premium articles available offline?</summary>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
         Currently, the articles themselves are not directly downloadable for offline reading, but Lifetime
            Premium Members get access to <b>separate</b> PDF and eBook downloads as part of their membership benefits.
                </p>
                </details>
</Fade>
</div>
  <Fade direction="up"  triggerOnce>
                <p className="text-center mt-8 text-gray-600 dark:text-gray-300">
                   Have more questions? <Link href="/contact" legacyBehavior><a className="text-blue-500 hover:underline">Contact Us</a></Link>
             </p>
                </Fade>
            </section>
           </main>
        </div>

  );
}



function PremiumButton({ user }) {
    if (!user) {
        return (
                <Link href="/login" legacyBehavior>
                <a className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors hover:scale-105">
              Please Login to Get Lifetime Access
                 </a>
               </Link>

        )
    }

    return (
       <Link href="/checkout" legacyBehavior>
         <a className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors hover:scale-105">Get Lifetime Access</a>
       </Link>
    )
}
