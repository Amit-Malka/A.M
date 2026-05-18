import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import WorkWithMe from './components/WorkWithMe';
import Contact from './components/Contact';
import DynamicBackground from './components/DynamicBackground';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background-dark font-inter text-white overflow-x-hidden">
      <DynamicBackground />
      <Header />
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
