import React from 'react';
import Header from './components/Header';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import WorkWithMe from './components/WorkWithMe';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans overflow-x-hidden">
      <Header />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <WorkWithMe />
        <Contact />
      </main>
    </div>
  );
}

export default App;
