import React from 'react';
import { motion } from 'framer-motion';
import { projectCategories, projectTechnologies } from '../utils/projectData';

interface ProjectFilterProps {
  selectedCategory: string;
  selectedTechs: string[];
  onCategoryChange: (category: string) => void;
  onTechChange: (tech: string) => void;
  onClearFilters: () => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  selectedCategory,
  selectedTechs,
  onCategoryChange,
  onTechChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedCategory !== 'All' || selectedTechs.length > 0;

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Filter by Category</h3>
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-primary text-white shadow-lg shadow-secondary/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Technology Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Filter by Technology</h3>
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {projectTechnologies.map((tech) => (
            <motion.button
              key={tech}
              onClick={() => onTechChange(tech)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTechs.includes(tech)
                  ? 'bg-secondary text-white border border-secondary/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <motion.button
          onClick={onClearFilters}
          className="text-sm text-accent hover:text-white transition-colors duration-300 underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Clear all filters
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProjectFilter;
