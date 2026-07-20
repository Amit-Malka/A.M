import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Brain, Code, Users } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Skills: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: <Code size={20} />,
      skills: [
        { name: 'Python', icon: '🐍' },
        { name: 'Large Language Models', icon: '🤖' },
        { name: 'RAG Systems', icon: '🔍' },
        { name: 'Pandas', icon: '🐼' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Statistical Analysis', icon: '📊' },
        { name: 'AI Agents', icon: '🧠' },
        { name: 'R', icon: '📈' },
        { name: 'SQL', icon: '💾' },
        { name: 'Data Visualization', icon: '📈' },
        { name: 'Computational Biology', icon: '🧬' }
      ]
    },
    {
      title: 'AI Development Tools',
      icon: <Brain size={20} />,
      skills: [
        { name: 'ChromaDB', icon: '🎨' },
        { name: 'Neo4j', icon: '🕸️' },
        { name: 'Cursor', icon: '🎯' },
        { name: 'Claude Code', icon: '🤖' },
        { name: 'React', icon: '⚛️' },
        { name: 'Git', icon: '🔗' },
        { name: 'Prompt Engineering', icon: '💭' },
        { name: 'Vector Databases', icon: '🗄️' }
      ]
    },
    {
      title: 'Professional Skills',
      icon: <Users size={20} />,
      skills: [
        { name: 'Team Collaboration', icon: '🤝' },
        { name: 'Problem Solving', icon: '🧩' },
        { name: 'Fast Learning', icon: '🚀' },
        { name: 'Adaptability', icon: '🔄' },
        { name: 'Leadership', icon: '👑' },
        { name: 'Communication', icon: '💬' }
      ]
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
  };

  const riseIn = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 },
  };

  return (
    <section id="skills" className="relative scroll-mt-24 bg-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="mb-12" {...riseIn}>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted max-w-2xl">
            Comprehensive expertise in AI, development tools, and professional competencies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-line">
                <span className="text-accent">{category.icon}</span>
                <h3 className="font-display text-xl text-ink">{category.title}</h3>
              </div>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={itemVariants}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-line text-ink rounded-md text-sm"
                  >
                    <span aria-hidden="true">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
