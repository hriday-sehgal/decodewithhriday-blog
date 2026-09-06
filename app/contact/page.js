import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Hriday Sehgal | AI & Full Stack Engineer',
  description: 'Get in touch with Hriday Sehgal for consulting on Hybrid RAG integrations, LLM workflows, custom API architectures, or Next.js production websites.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: 'https://decodewithhriday.vercel.app/contact',
    title: 'Contact Hriday Sehgal | AI & Full Stack Engineer',
    description: 'Get in touch with Hriday Sehgal for consulting on Hybrid RAG integrations, LLM workflows, custom API architectures, or Next.js production websites.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
