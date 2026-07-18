import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Hriday Sehgal | AI Engineer & Full Stack Developer',
  description: 'Get to know Hriday Sehgal, an AI Engineer and Full Stack Developer specializing in RAG systems, LLM architectures, and scalable web engineering.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    url: 'https://decodewithhriday.vercel.app/about',
    title: 'About Hriday Sehgal | AI Engineer & Full Stack Developer',
    description: 'Get to know Hriday Sehgal, an AI Engineer and Full Stack Developer specializing in RAG systems, LLM architectures, and scalable web engineering.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
