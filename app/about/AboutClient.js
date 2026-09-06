'use client';

import Link from 'next/link';
import { 
  FaLinkedin, FaGithub, FaEnvelope, FaAws, FaCode, FaServer, 
  FaHeartbeat, FaCogs, FaAward 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const skills = [
    {
      category: 'Artificial Intelligence & GenAI',
      icon: <FaHeartbeat className="w-5 h-5 text-rose-500" />,
      items: ['RAG Systems', 'Prompt Engineering', 'Multi-Agent Systems', 'LangGraph', 'LLMs', 'Vector Databases', 'STT / TTS']
    },
    {
      category: 'Backend & APIs',
      icon: <FaServer className="w-5 h-5 text-indigo-500" />,
      items: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'PostgreSQL', 'PGVector', 'Qdrant', 'MongoDB', 'REST APIs', 'Webhooks']
    },
    {
      category: 'Frontend & Web',
      icon: <FaCode className="w-5 h-5 text-violet-500" />,
      items: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5 & CSS3', 'Tailwind CSS']
    },
    {
      category: 'Cloud & DevOps',
      icon: <FaAws className="w-5 h-5 text-amber-500" />,
      items: ['AWS (EC2, S3, RDS)', 'Docker', 'CI/CD Pipelines', 'Git & GitHub']
    }
  ];

  return (
    <div className="bg-transparent min-h-screen py-12 px-4 sm:px-6 md:px-8">
      <main className="container mx-auto max-w-4xl space-y-20">
        
        {/* Intro Section */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 pt-10"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold text-violet-650 dark:text-violet-400">
              AI Engineer & Full Stack Developer
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
            About <span className="gradient-text-primary">Hriday Sehgal</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-650 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            I sit at the crossroads of Generative AI and full-stack software engineering. I own the end-to-end delivery of AI chatbot systems — from pipeline architecture to production deployments on AWS.
          </p>

          <div className="flex justify-center space-x-4 pt-2">
            <a
              href="https://www.linkedin.com/in/hridaysehgal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/hriday-sehgal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="mailto:hriday.career@gmail.com"
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-455 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </motion.section>

        {/* Skill Matrix */}
        <section className="space-y-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-zinc-100 text-center">
            Technical Toolkit
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill) => (
              <motion.div 
                key={skill.category}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm hover:shadow transition-all duration-300"
              >
                <div className="flex items-center space-x-2.5 mb-4">
                  {skill.icon}
                  <h3 className="font-display font-bold text-slate-900 dark:text-zinc-100 text-sm sm:text-base">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200/30 dark:border-zinc-700/60 hover:border-violet-500/20 dark:hover:border-violet-400/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why Read My Blog Section */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-zinc-100">
              Why Read My Blog?
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Actionable insights, production engineering workflows, and system architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md hover:border-violet-500/15 transition-all duration-300 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-4 text-3xl font-extrabold text-slate-100 dark:text-zinc-800/40 font-display select-none">
                01
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-zinc-100 text-base sm:text-lg mb-2">
                Actionable Guides
              </h3>
              <p className="text-xs sm:text-sm text-slate-655 dark:text-zinc-400 leading-relaxed">
                No abstract high-level hand-waving. I cover concrete configuration files, code blocks, routing patterns, and web optimization practices that you can inspect and copy straight into your production app.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md hover:border-violet-500/15 transition-all duration-300 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-4 text-3xl font-extrabold text-slate-100 dark:text-zinc-800/40 font-display select-none">
                02
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-zinc-100 text-base sm:text-lg mb-2">
                Production Architectures
              </h3>
              <p className="text-xs sm:text-sm text-slate-655 dark:text-zinc-400 leading-relaxed">
                Dive deep into real-world architectures. Learn how caching layers are mapped out, how vector databases ingest structured data, and how edge systems deploy serverless API configurations.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md hover:border-violet-500/15 transition-all duration-300 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-4 text-3xl font-extrabold text-slate-100 dark:text-zinc-800/40 font-display select-none">
                03
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-zinc-100 text-base sm:text-lg mb-2">
                Product Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-655 dark:text-zinc-400 leading-relaxed">
                Bridging engineering limits with product priorities. I write about prioritizing technical debt, coordinating web analytics trackers, building checkout funnels, and validating system design.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md hover:border-violet-500/15 transition-all duration-300 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-4 text-3xl font-extrabold text-slate-100 dark:text-zinc-800/40 font-display select-none">
                04
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-zinc-100 text-base sm:text-lg mb-2">
                Career Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-655 dark:text-zinc-400 leading-relaxed">
                Sharing my technical learnings — from scaling open source repositories in GSSoC to cloud architect practices and tech PM tools. Practical recommendations to level up your engineering career path.
              </p>
            </div>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="relative p-8 sm:p-12 rounded-3xl border border-slate-200/50 dark:border-zinc-800 bg-gradient-to-br from-white/40 to-slate-50/20 dark:from-zinc-900/40 dark:to-zinc-950/20 backdrop-blur-md overflow-hidden text-center space-y-6 shadow-sm">
          {/* Accent light element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-zinc-100 leading-tight">
            Let&apos;s Build Something <span className="gradient-text-primary">Exceptional</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Looking for consultation on Hybrid RAG integrations, LLM workflows, custom API architectures, or Next.js production websites ? Let&apos;s talk and map out your next system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20 text-center"
            >
              Get in Touch
            </Link>
            <Link
              href="/blogs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-slate-50 dark:hover:bg-zinc-850/80 text-slate-800 dark:text-zinc-200 font-semibold text-sm transition-all duration-200 text-center"
            >
              Explore Blogs
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
