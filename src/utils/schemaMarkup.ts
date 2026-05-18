export const generatePersonSchema = () => ({
  '@context': 'https://schema.org/',
  '@type': 'Person',
  name: 'Amit Malka',
  jobTitle: 'AI Developer & Data Analyst',
  url: 'https://amit-malka.vercel.app/',
  image: 'https://amit-malka.vercel.app/images/me.jpg',
  description:
    'AI developer with expertise in Large Language Models, RAG systems, and intelligent agent development. Specialized in computational biology and statistical analysis.',
  sameAs: [
    'https://linkedin.com/in/--amitmalka--',
    'https://github.com/Amit-Malka'
  ],
  email: 'amit.malka08@gmail.com',
  location: {
    '@type': 'Place',
    name: 'Israel'
  }
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'Amit Malka Portfolio',
  url: 'https://amit-malka.vercel.app/',
  description: 'Professional portfolio showcasing AI development expertise, projects, and experience',
  creator: {
    '@type': 'Person',
    name: 'Amit Malka'
  }
});
