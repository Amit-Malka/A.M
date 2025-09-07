import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import DynamicBackground from './DynamicBackground';

const Experience: React.FC = () => {
  const experiences = [
    {
      type: 'education',
      title: 'AI Development Course',
      company: 'Ben-Gurion University & The Institut',
      period: '6/2025 – 9/2025',
      location: 'Israel',
      description: 'Advanced curriculum covering LLMs, RAG systems, MCP, and AI Agents. Hands-on development of intelligent agents with memory, logic, and reasoning capabilities.',
      highlights: [
        'Large Language Models (LLMs)',
        'RAG Systems Implementation',
        'AI Agent Development',
        'Multi-modal AI Processing'
      ]
    },
    {
      type: 'education',
      title: 'Bachelor of Biotechnology - Bio Data',
      company: 'Tel Hai College',
      period: '10/2020 – 10/2023',
      location: 'Israel',
      description: 'GPA: 85. Combined curriculum of biological sciences with specialized data analysis coursework.',
      highlights: [
        'Statistics & Programming for Data Analysis',
        'Computational Biology',
        'Advanced Python Programming',
        'Bioinformatics Tools'
      ]
    },
    {
      type: 'work',
      title: 'Lab Technician & Shift Manager',
      company: 'MyHeritage',
      period: '5/2020 – 10/2021',
      location: 'Israel',
      description: 'Collaborated on MVP deployment of critical laboratory infrastructure and optimized throughput by identifying bottlenecks.',
      highlights: [
        'Laboratory infrastructure deployment',
        'Workflow optimization',
        'Cross-functional team leadership',
        'Scale-up operations management'
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={20} />;
      case 'work':
        return <Briefcase size={20} />;
      case 'project':
        return <Briefcase size={20} />;
      default:
        return <Briefcase size={20} />;
    }
  };


  return (
    <section id="experience" className="relative min-h-screen bg-gradient-to-br from-primary via-background-light to-primary py-20">
      <DynamicBackground />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">Experience & Education</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My journey through AI development, research, and professional experience
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-primary h-full rounded-full"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Timeline marker */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-primary rounded-full items-center justify-center text-white shadow-lg border-4 border-background-dark">
                {getIcon(experience.type)}
              </div>

              {/* Content card */}
              <motion.div
                className={`bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.1, ease: "easeOut" }}
              >
                <div className="flex md:hidden items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${experience.type === 'education' ? 'bg-green-500/20 border border-green-500/30' : experience.type === 'project' ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-blue-500/20 border border-blue-500/30'}`}>
                    {getIcon(experience.type)}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${experience.type === 'education' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : experience.type === 'project' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                    {experience.type}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                <div className="text-lg font-medium text-accent mb-4">{experience.company}</div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {experience.period}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {experience.location}
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">{experience.description}</p>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  {experience.highlights.map((highlight, highlightIndex) => (
                    <span
                      key={highlightIndex}
                      className="px-3 py-1 bg-secondary/20 text-accent border border-secondary/30 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;