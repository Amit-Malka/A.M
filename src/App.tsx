import React, { Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import DynamicBackground from './components/DynamicBackground';
import './App.css';

// Lazy load heavy components
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const WorkWithMe = React.lazy(() => import('./components/WorkWithMe'));
const Contact = React.lazy(() => import('./components/Contact'));

function App() {

  return (
    <div className="min-h-screen bg-background-dark font-inter text-white overflow-x-hidden">
      <DynamicBackground />
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
  );
}

export default App;
