import React from 'react';
import { motion } from 'framer-motion';
import { User, Brain, Code, Users } from 'lucide-react';
import DynamicBackground from './DynamicBackground';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Brain size={24} />,
      title: 'AI Development',
      description: 'Specialized in LLMs, RAG systems, and intelligent agent development'
    },
    {
      icon: <Code size={24} />,
      title: 'Data Analysis',
      description: 'Strong foundation in statistical analysis and computational biology'
    },
    {
      icon: <User size={24} />,
      title: 'Problem Solver',
      description: 'Combines technical proficiency with natural curiosity'
    },
    {
      icon: <Users size={24} />,
      title: 'Team Collaboration',
      description: 'Experienced in cross-functional teams and collaborative problem-solving'
    }
  ];

  return (
    <section id="about" className="relative min-h-screen bg-gradient-to-br from-primary to-background-light py-20">
      <DynamicBackground />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Profile Image */}
          <motion.div
            className="lg:col-span-1 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-64 h-80 rounded-2xl bg-gradient-primary p-1 animate-glow">
                <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center text-accent text-lg font-semibold border-4 border-accent/20 overflow-hidden">
                  <img
                    src="/images/me2.jpg"
                    alt="Amit Malka"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="320"
                    height="400"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary/30 rounded-full blur-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent/40 rounded-full blur-sm"></div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl text-accent font-medium leading-relaxed">
              I'm an AI developer with a strong foundation in programming and statistical analysis. 
              My journey began in biotechnology and data analysis, where I developed expertise in 
              computational biology and research methodologies.
            </p>
            

            <p className="text-lg text-gray-300 leading-relaxed">
              With experience ranging from laboratory operations at MyHeritage to genomic data 
              analysis at MIGAL Research Institute, I bring a unique perspective to AI development 
              - understanding both the theoretical foundations and practical applications of 
              intelligent systems.
            </p>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 hover:bg-white/10 hover:border-accent/30 hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 text-white">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{highlight.title}</h3>
              <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;