import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Users } from 'lucide-react';
import DynamicBackground from './DynamicBackground';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: <Code size={24} />,
      skills: [
        { name: 'Python', icon: '🐍', color: '#3776AB' },
        { name: 'Large Language Models', icon: '🤖', color: '#FF6B6B' },
        { name: 'RAG Systems', icon: '🔍', color: '#4ECDC4' },
        { name: 'Pandas', icon: '🐼', color: '#150458' },
        { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
        { name: 'TypeScript', icon: '📘', color: '#3178C6' },
        { name: 'Statistical Analysis', icon: '📊', color: '#FF6B35' },
        { name: 'AI Agents', icon: '🧠', color: '#45B7D1' },
        { name: 'R', icon: '📈', color: '#276DC3' },
        { name: 'SQL', icon: '💾', color: '#336791' },
        { name: 'Data Visualization', icon: '📈', color: '#F7931E' },
        { name: 'Computational Biology', icon: '🧬', color: '#00D2FF' }
      ]
    },
    {
      title: 'AI Development Tools',
      icon: <Brain size={24} />,
      skills: [
        { name: 'ChromaDB', icon: '🎨', color: '#10B981' },
        { name: 'Neo4j', icon: '🕸️', color: '#008CC1' },
        { name: 'Cursor', icon: '🎯', color: '#6366F1' },
        { name: 'Claude Code', icon: '🤖', color: '#D97706' },
        { name: 'React', icon: '⚛️', color: '#61DAFB' },
        { name: 'Git', icon: '🔗', color: '#F05032' },
        { name: 'Prompt Engineering', icon: '💭', color: '#96CEB4' },
        { name: 'Vector Databases', icon: '🗄️', color: '#FECA57' }
      ]
    },
    {
      title: 'Professional Skills',
      icon: <Users size={24} />,
      skills: [
        { name: 'Team Collaboration', icon: '🤝', color: '#10B981' },
        { name: 'Problem Solving', icon: '🧩', color: '#F59E0B' },
        { name: 'Fast Learning', icon: '🚀', color: '#EF4444' },
        { name: 'Adaptability', icon: '🔄', color: '#8B5CF6' },
        { name: 'Leadership', icon: '👑', color: '#F97316' },
        { name: 'Communication', icon: '💬', color: '#06B6D4' }
      ]
    }
  ];

  return (
    <section id="skills" className="relative min-h-screen bg-background-dark py-20">
      <DynamicBackground />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive expertise in AI, development tools, and professional skills
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + 0.2 }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: (categoryIndex * 0.1) + (skillIndex * 0.02) + 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${skill.color}20`, boxShadow: `0 0 20px ${skill.color}30` }}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-sm font-medium text-white group-hover:text-accent transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;