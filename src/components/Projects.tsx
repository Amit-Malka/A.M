import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DynamicBackground from './DynamicBackground';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';
import { projectsData } from '../utils/projectData';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
      const techMatch =
        selectedTechs.length === 0 ||
        selectedTechs.some((tech) => project.technologies.includes(tech));

      return categoryMatch && techMatch;
    });
  }, [selectedCategory, selectedTechs]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTechChange = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedTechs([]);
  };

  return (
    <section id="projects" className="relative min-h-screen bg-background-dark py-20">
      <DynamicBackground />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing practical applications of AI and data science expertise
          </p>
        </motion.div>

        {/* Project Filter */}
        <ProjectFilter
          selectedCategory={selectedCategory}
          selectedTechs={selectedTechs}
          onCategoryChange={handleCategoryChange}
          onTechChange={handleTechChange}
          onClearFilters={handleClearFilters}
        />

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xl text-gray-300 mb-4">
              No projects match your filters. Try clearing filters to see all projects.
            </p>
            <motion.button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;