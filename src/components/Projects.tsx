import React from 'react';
import { motion } from 'framer-motion';
import ProjectsCarousel from './ProjectsCarousel';
import { projectsData } from '../utils/projectData';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Projects: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const riseIn = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 },
  };

  return (
    <section id="projects" className="relative scroll-mt-24 bg-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="mb-12" {...riseIn}>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Featured Projects</h2>
          <p className="text-lg text-muted max-w-2xl">
            Showcasing practical applications of AI and data science expertise
          </p>
        </motion.div>

        <ProjectsCarousel projects={projectsData} />
      </div>
    </section>
  );
};

export default Projects;
