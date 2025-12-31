import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import DynamicBackground from './DynamicBackground';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/AmitMalka-CV.pdf`, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('CV file not found');
      }

      const link = document.createElement('a');
      link.href = `${process.env.PUBLIC_URL}/AmitMalka-CV.pdf`;
      link.download = 'Amit-Malka-CV.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('CV download failed:', error);
      window.open('/AmitMalka-CV.pdf', '_blank');
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-dark pt-20">
      <DynamicBackground />
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
        {/* Profile Image */}
        <motion.div
          className="order-2 lg:order-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div 
              className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-primary p-1 shadow-2xl shadow-secondary/30"
              animate={{ boxShadow: ['0 0 60px rgba(57, 83, 171, 0.3)', '0 0 80px rgba(57, 83, 171, 0.5)', '0 0 60px rgba(57, 83, 171, 0.3)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-accent text-xl font-semibold border-4 border-accent/20 overflow-hidden">
                <img
                  src={`${process.env.PUBLIC_URL}/images/me.jpg`}
                  alt="Amit Malka"
                  className="w-full h-full rounded-full object-cover"
                  loading="eager"
                  decoding="async"
                  width="400"
                  height="400"
                />
              </div>
            </motion.div>
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full opacity-60"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent rounded-full opacity-50"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/2 -right-8 w-4 h-4 bg-primary rounded-full opacity-70"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="order-1 lg:order-2 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <motion.h1
            className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Amit Malka
          </motion.h1>
          
          <motion.h2
            className="text-2xl lg:text-3xl font-light text-accent mb-6 opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI Developer & Data Analyst
          </motion.h2>
          
          <motion.p 
            className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transforming complex data into intelligent systems. Specialized in LLM's, RAG systems, and AI agent development with a strong foundation in statistical analysis.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              onClick={handleDownloadCV}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-secondary/25 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              Download CV
            </motion.button>
            <motion.button 
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-xl hover:bg-secondary hover:text-white transition-all duration-300 hover:-translate-y-1 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a 
              href="https://linkedin.com/in/--amitmalka--" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-accent/20 rounded-full text-accent hover:bg-secondary hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-secondary/10"
              aria-label="LinkedIn Profile"
              variants={socialVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="https://github.com/Amit-Malka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-accent/20 rounded-full text-accent hover:bg-secondary hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-secondary/10"
              aria-label="GitHub Profile"
              variants={socialVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2, rotate: -10 }}
            >
              <Github size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-accent cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={24} />
        </motion.div>
        <span className="text-sm font-medium">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;