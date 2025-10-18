import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Zap } from 'lucide-react';
import { Project } from '../utils/projectData';
import * as Icons from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const iconComponent = Icons[project.icon as keyof typeof Icons] || Icons.Zap;
  const IconComponent = iconComponent as React.ComponentType<{ size: number }>;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
    >
      <motion.div
        className="relative h-full bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group flex flex-col"
        whileHover={{ scale: 1.02 }}
      >
        {/* Project Header */}
        <div className="relative h-48 bg-gradient-primary flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col items-center gap-4 text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center">
              <IconComponent size={24} />
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                project.category === 'AI/ML'
                  ? 'bg-red-500/20 border-red-300/30 text-red-200'
                  : project.category === 'Data Science'
                    ? 'bg-green-500/20 border-green-300/30 text-green-200'
                    : 'bg-blue-500/20 border-blue-300/30 text-blue-200'
              }`}
            >
              {project.category}
            </span>
          </div>
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full animate-float"></div>
          <div
            className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        {/* Content */}
        <div className="p-8 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6 text-sm">
            {project.description}
          </p>

          {/* Highlights */}
          <motion.div
            className="space-y-2 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          >
            {project.highlights.map((highlight, highlightIndex) => (
              <div key={highlightIndex} className="flex items-center gap-2 text-sm text-gray-300">
                <Zap size={14} className="text-secondary flex-shrink-0" />
                {highlight}
              </div>
            ))}
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-secondary/20 text-accent border border-secondary/30 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-3">
            {project.liveDemo && (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-secondary/20 text-accent border border-secondary/30 font-semibold rounded-xl hover:bg-secondary/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                Live Demo
              </motion.a>
            )}

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              View Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
