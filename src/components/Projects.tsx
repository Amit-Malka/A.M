import React from 'react';
import { motion } from 'framer-motion';
import { Github, Brain, BarChart3, Zap, Database } from 'lucide-react';
import DynamicBackground from './DynamicBackground';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Financial RAG System',
      description: 'Advanced hybrid RAG agent for SEC 10Q financial document analysis combining vector and graph retrieval architectures.',
      longDescription: 'Engineered a sophisticated metadata-driven system that processes multi-modal content including text, tables, and charts using LlamaIndex and advanced parsing techniques. The dual architecture integrates ChromaDB vector store with Neo4j graph database for comprehensive document understanding.',
      technologies: ['Python', 'LlamaIndex', 'ChromaDB', 'Neo4j', 'Gradio', 'RAG Systems'],
      category: 'AI/ML',
      icon: <Brain size={24} />,
      github: 'https://github.com/Amit-Malka/Financial-Hybrid-RAG-System',
      highlights: [
        'Multi-modal pipeline processing',
        'Hybrid vector + graph retrieval',
        'Interactive Gradio interface',
        'Real-time optimization controls'
      ]
    },
    {
      title: 'Genomic Data Analysis Pipeline',
      description: 'Comprehensive single-cell RNA sequencing analysis system with custom algorithms for high-dimensional biological data.',
      longDescription: 'Built scalable computational workflows using R programming for processing and analyzing complex genomic datasets. Developed custom algorithms for data normalization, dimensionality reduction, and cluster analysis with focus on modularity and reproducibility.',
      technologies: ['R', 'Bioinformatics', 'Statistical Analysis', 'Data Visualization'],
      category: 'Data Science',
      icon: <BarChart3 size={24} />,
      github: 'https://github.com/Amit-Malka/BSc-research-project',
      highlights: [
        'End-to-end data pipeline',
        'Custom normalization algorithms',
        'Advanced clustering techniques',
        'Comprehensive documentation'
      ]
    },
    {
      title: 'Medical RAG POC',
      description: 'Proof of Concept for medical Q&A system using FAISS vector database and Ollama for local LLM inference.',
      longDescription: 'Developed an intelligent medical question-answering system that leverages vector similarity search and local language models. The system demonstrates practical application of RAG architecture in healthcare domain with focus on privacy and performance.',
      technologies: ['Python', 'FAISS', 'Ollama', 'Vector DB', 'LLMs'],
      category: 'AI/ML',
      icon: <Database size={24} />,
      github: 'https://github.com/Amit-Malka/medical-rag-poc',
      highlights: [
        'Medical domain expertise',
        'Local LLM deployment',
        'FAISS vector search',
        'Privacy-focused design'
      ]
    }
  ];


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

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-accent/30 hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Project Header */}
              <div className="relative h-48 bg-gradient-primary flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 flex flex-col items-center gap-4 text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center">
                    {project.icon}
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                    project.category === 'AI/ML' 
                      ? 'bg-red-500/20 border-red-300/30 text-red-200' 
                      : project.category === 'Data Science'
                      ? 'bg-green-500/20 border-green-300/30 text-green-200'
                      : 'bg-blue-500/20 border-blue-300/30 text-blue-200'
                  }`}>
                    {project.category}
                  </span>
                </div>
                {/* Animated background elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full animate-float"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              </div>

              <motion.div
                className="p-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
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
                  className="flex flex-wrap gap-2 mb-6"
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

                {/* GitHub Link */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/25 hover:scale-105 transition-all duration-300"
                      aria-label="View source code"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;