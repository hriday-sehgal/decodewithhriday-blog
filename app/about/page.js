// app/about/page.js
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

export const metadata = {
  title: 'Decode with Hriday | About Us',
  description: 'About Us',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <main className="flex-grow">

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-700 dark:to-blue-900 py-20 px-6 md:px-12 text-center relative overflow-hidden">
          <div className="container mx-auto z-10 relative">
            <Fade direction="up" duration={800} triggerOnce>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                About Me
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                MERN Stack Developer | Product Management Enthusiast | Healthcare Technology
              </p>
            </Fade>
            <Fade direction="up" duration={800} delay={300} triggerOnce>
              <Link href="/blogs" className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full transition-colors hover:scale-105">
                Read My Blogs
              </Link>
            </Fade>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <Fade direction="up" triggerOnce>
              <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
            </Fade>
            <div className="grid grid-cols-1  gap-12">

              {/* Bio (Now Full Width) */}
              <div>
                <Fade direction="up" delay={400} duration={700} triggerOnce>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Hi, I&apos;m Hriday Sehgal!
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    I&apos;m a MERN stack developer with a passion for building robust and scalable web applications.  I&apos;m also deeply interested
                    in product management, exploring how technology can solve real-world problems.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    My journey into blogging started as a way to document my learning process and share my experiences with the tech community.
                    I found that explaining complex concepts in writing helped me solidify my understanding, and I loved the idea of helping
                    others along the way.
                  </p>
                </Fade>
              </div>
            </div>
          </div>
        </section>

        {/* What My Blogs are About */}
        <section className="py-16 px-6 md:px-12 bg-gray-200 dark:bg-gray-800">
          <div className="container mx-auto">
            <Fade direction="up" triggerOnce>
              <h2 className="text-3xl font-bold text-center mb-8">What My Blogs are About</h2>
            </Fade>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Category card linking to the respective Category in blog page */}
              <Fade direction="up" delay={100} triggerOnce>
                <Link href="/blogs?category=Technology" >
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Technology</h3>
                    <p className="text-gray-600 dark:text-gray-300">Exploring the latest technologies and trends.</p>
                  </div>
                </Link>
              </Fade>
              <Fade direction="up" delay={200} triggerOnce>
                <Link href={"/blogs?category=Product Management"} >
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all  cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Product Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">Insights into building and launching successful products.</p>
                  </div>
                </Link>
              </Fade>
              <Fade direction="up" delay={300} triggerOnce>
                <Link href="/blogs?category=Web Development" >
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all  cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                    <p className="text-gray-600 dark:text-gray-300">Tutorials, tips, and best practices for web developers.</p>
                  </div>
                </Link>
              </Fade>
              <Fade direction="up" delay={400} triggerOnce>
                <Link href="/blogs?category=Software Development" >
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all  cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Software Development</h3>
                    <p className="text-gray-600 dark:text-gray-300">Analyzing emerging trends in the development world.</p>
                  </div>
                </Link>
              </Fade>
              <Fade direction="up" delay={500} triggerOnce>
                <Link href="/blogs?category=Healthcare" >
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all  cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
                    <p className="text-gray-600 dark:text-gray-300">Bridging the gap between healthcare and technology.</p>
                  </div>
                </Link>
              </Fade>
              <Fade direction="up" delay={500} triggerOnce>
                <Link href="/blogs?category=Product Management" >
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg hover:scale-[1.02] transition-all  cursor-pointer">
                    <h3 className="text-xl font-semibold mb-2">Project Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">Strategies for planning, executing, and delivering successful projects.</p>
                  </div>
                </Link>
              </Fade>
            </div>
            
            {/* Read all my blogs */}
            <Fade direction="up" delay={600} triggerOnce>
              <div className="text-center mt-8">
                <Link href="/blogs" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors hover:scale-105">
                  Read All My Blogs
                </Link>
              </div>
            </Fade>
          </div>
        </section>

        {/* Why Read My Blog */}
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <Fade direction="up" triggerOnce>
              <h2 className="text-3xl font-bold text-center mb-8">Why Read My Blog?</h2>
            </Fade>

            {/*Changing it to List format*/}

            <Fade direction="up" triggerOnce>
              <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                <li><strong>Actionable Insights:</strong> Get practical tips and techniques you can apply immediately.</li>
                <li><strong>Deep-Dive Tutorials:</strong>  Learn complex topics through comprehensive, step-by-step guides.</li>
                <li><strong>Career Tips:</strong>  Gain valuable advice for navigating the tech industry.</li>
                <li><strong>Expertise:</strong> Benefit from my experience as a GSSoC Contributor and AWS Certified professional, along with insights from my internships.</li>
              </ul>
            </Fade>


          </div>
        </section>


        {/* Connect with Me */}
        <section className="bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-700 dark:to-blue-900 py-16 px-6 md:px-12 text-center relative overflow-hidden">
          <div className="container mx-auto z-10 relative">
            <Fade direction="up" triggerOnce>
              <h2 className="text-3xl font-bold text-white mb-8">Connect with Me</h2>
            </Fade>
            <div className="flex justify-center space-x-6 mb-8">
              <Fade direction="up" delay={200} triggerOnce>
                <Link href="https://www.linkedin.com/in/hridaysehgal/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                    <FaLinkedin className="text-4xl" />
                </Link>

                <Link href="https://github.com/hriday-sehgal" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors">
                    <FaGithub className="text-4xl" />
                </Link>
                

                <Link  href="mailto:hriday.career@gmail.com" className="text-white hover:text-gray-200 transition-colors">
                    <FaEnvelope className="text-4xl" />
                </Link>
              </Fade>
            </div>
            <Fade direction="up" delay={400} triggerOnce>
              <p className="text-lg text-white mb-8">
                For collaborations, queries, or just to say hello, feel free to reach out!
              </p>
            </Fade>
            <Fade direction="up" delay={600} triggerOnce>
              <Link href="/contact" className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full transition-colors hover:scale-105">
                Contact Me
              </Link>
            </Fade>
          </div>
        </section>
      </main>

      {/*Removed Footer*/}
    </div>
  );
}

