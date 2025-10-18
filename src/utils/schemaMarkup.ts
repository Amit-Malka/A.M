export const generatePersonSchema = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Amit Malka',
    jobTitle: 'AI Developer & Data Analyst',
    url: 'https://amit-malka.github.io/A.M/',
    image: 'https://amit-malka.github.io/A.M/images/me.jpg',
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
  };
};

export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Amit Malka Portfolio',
    url: 'https://amit-malka.github.io/A.M/',
    description: 'Professional portfolio showcasing AI development expertise, projects, and experience',
    creator: {
      '@type': 'Person',
      name: 'Amit Malka'
    }
  };
};

export const generateProjectSchema = (project: {
  title: string;
  description: string;
  github: string;
  category: string;
  technologies: string[];
}) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    keywords: project.technologies.join(', '),
    url: project.github,
    creator: {
      '@type': 'Person',
      name: 'Amit Malka'
    }
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

export const generateOrgSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amit Malka',
    url: 'https://amit-malka.github.io/A.M',
    logo: 'https://amit-malka.github.io/A.M/logo192.png',
    description: 'AI Developer & Data Analyst',
    sameAs: [
      'https://linkedin.com/in/--amitmalka--',
      'https://github.com/Amit-Malka'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'amit.malka08@gmail.com'
    }
  };
};

export const generateOpenGraphTags = () => {
  return {
    'og:title': 'Amit Malka - AI Developer & Data Analyst',
    'og:description':
      'Transforming complex data into intelligent systems. Specialized in LLMs, RAG systems, and AI agent development.',
    'og:image': 'https://amit-malka.github.io/A.M/images/me.jpg',
    'og:url': 'https://amit-malka.github.io/A.M/',
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Amit Malka - AI Developer & Data Analyst',
    'twitter:description':
      'Transforming complex data into intelligent systems. Specialized in LLMs, RAG systems, and AI agent development.',
    'twitter:image': 'https://amit-malka.github.io/A.M/images/me.jpg'
  };
};

export const generateMetaTags = () => {
  return {
    title: 'Amit Malka - AI Developer & Data Analyst | Portfolio',
    description:
      'Portfolio of Amit Malka, AI developer specializing in LLMs, RAG systems, and intelligent agents. View projects, skills, and experience.',
    keywords:
      'AI developer, data analyst, LLM, RAG systems, AI agents, machine learning, data science, Python, React',
    author: 'Amit Malka',
    viewport: 'width=device-width, initial-scale=1.0',
    'charset': 'utf-8'
  };
};
