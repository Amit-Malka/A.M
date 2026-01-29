import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import './App.css';
import { generatePersonSchema, generateWebsiteSchema } from './utils/schemaMarkup';

// Lazy load heavy components
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const WorkWithMe = React.lazy(() => import('./components/WorkWithMe'));
const Contact = React.lazy(() => import('./components/Contact'));

function App() {
  useEffect(() => {
    // Add person schema to head
    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.textContent = JSON.stringify(generatePersonSchema());
    document.head.appendChild(personScript);

    // Add website schema to head
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(generateWebsiteSchema());
    document.head.appendChild(websiteScript);

    return () => {
      document.head.removeChild(personScript);
      document.head.removeChild(websiteScript);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background-dark font-inter text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <About />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>}>
            <Skills />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>}>
            <Experience />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>}>
            <WorkWithMe />
          </Suspense>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>}>
            <Contact />
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
