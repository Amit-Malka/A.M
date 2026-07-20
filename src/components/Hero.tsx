import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import { downloadCV } from '../utils/downloadCV';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const photoY = prefersReducedMotion ? '0%' : parallaxY;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 bg-bg">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-1 space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="font-display text-5xl lg:text-7xl leading-tight text-ink"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Amit Malka
          </motion.h1>

          <motion.h2
            className="text-2xl lg:text-3xl font-light text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI Developer & Data Analyst
          </motion.h2>

          <motion.p
            className="text-lg lg:text-xl text-muted max-w-2xl leading-relaxed mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transforming complex data into intelligent systems. Specialized in LLM's, RAG systems, and AI agent development with a strong foundation in statistical analysis.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              type="button"
              onClick={downloadCV}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg font-semibold transition-colors hover:opacity-90"
            >
              <Download size={20} />
              Download CV
            </button>
            <button
              type="button"
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-line text-ink font-semibold transition-colors hover:bg-surface"
            >
              Learn More
              <ArrowDown size={20} />
            </button>
          </motion.div>

          <motion.div
            className="flex gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href="https://linkedin.com/in/--amitmalka--"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-line text-ink hover:text-accent hover:border-accent transition-colors"
              aria-label="LinkedIn Profile"
              variants={socialVariants}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <Linkedin size={22} />
            </motion.a>
            <motion.a
              href="https://github.com/Amit-Malka"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-line text-ink hover:text-accent hover:border-accent transition-colors"
              aria-label="GitHub Profile"
              variants={socialVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <Github size={22} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          ref={photoRef}
          className="order-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative w-full max-w-sm aspect-[4/5] border border-line overflow-hidden"
            style={{ y: photoY }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/me.jpg`}
              alt="Amit Malka"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToAbout}
      >
        <ArrowDown size={20} />
        <span className="text-sm font-medium">Scroll to explore</span>
      </motion.button>
    </section>
  );
};

export default Hero;
