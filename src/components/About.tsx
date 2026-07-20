import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const About: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const strengths = [
    {
      title: 'AI Development',
      description: 'Specialized in LLMs, RAG systems, and intelligent agent development'
    },
    {
      title: 'Data Analysis',
      description: 'Strong foundation in statistical analysis and computational biology'
    },
    {
      title: 'Problem Solver',
      description: 'Combines technical proficiency with natural curiosity'
    },
    {
      title: 'Team Collaboration',
      description: 'Experienced in cross-functional teams and collaborative problem-solving'
    }
  ];

  const riseIn = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 },
  };

  return (
    <section id="about" className="relative scroll-mt-24 bg-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2 className="font-display text-4xl lg:text-5xl text-ink mb-12" {...riseIn}>
          About Me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div className="space-y-6" {...riseIn}>
            <p className="text-xl text-ink leading-relaxed">
              A natural curiosity drives me to dive deep into complex systems.
              My journey started in biotechnology and data analysis, where I learned to find meaning within the 'noise' of high-dimensional biological data.
              This passion for data evolved into a deep focus on Artificial Intelligence.
              Today, as an AI Developer, I build the tools that help us make sense of our world.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              My expertise is in advanced AI, with a focus on LLMs and RAG systems.
              I enjoy the technical challenge of designing sophisticated solutions - developing multi-modal systems that understand text, tables, and charts, or engineering hybrid retrieval systems that combine vector search (ChromaDB) with graph databases (Neo4j) to provide the most accurate answers.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              <span className="text-ink font-medium"><span aria-hidden="true">🏆</span> Recently, I secured 2nd place at the Soroka Hospital hackathon with ResiPlanAI</span> - an AI-powered residency planning platform that revolutionizes medical training schedules.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Whether it's a financial report, a genomic sequence, or a complex scheduling problem, my goal is the same: to turn raw, complex information into clear, practical insights.
              I am a fast learner, highly adaptable, and a strong team collaborator.
            </p>
          </motion.div>

          <motion.ul className="border-t border-line divide-y divide-line" {...riseIn}>
            {strengths.map((strength) => (
              <li key={strength.title} className="py-6">
                <h3 className="font-display text-xl text-ink mb-2">{strength.title}</h3>
                <p className="text-muted leading-relaxed">{strength.description}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default About;
