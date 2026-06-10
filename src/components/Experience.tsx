import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink, Github } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences: Array<{
    type: 'education' | 'work' | 'project';
    title: string;
    company: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
    links?: Array<{ label: string; url: string }>;
  }> = [
    {
      type: 'education',
      title: 'MiluimAI — AI for Developers',
      company: 'TechTroop',
      period: '5/2026 – 7/2026',
      location: 'Israel',
      description: 'Practical training for developers in the AI era: AI-Native development workflows, working effectively with language models, and building LLM-based systems. Covers RAG systems connected to real data sources, agent and automation development, and modern AI system architecture, culminating in an LLM-based final project.',
      highlights: [
        'AI-Native Development (Cursor, Claude Code, Codex)',
        'Advanced Prompt Engineering',
        'RAG Pipelines & Vector DBs',
        'AI Agents & Automations (LangGraph, n8n)',
        'MCP (Model Context Protocol)'
      ],
      links: [
        { label: 'Course Page', url: 'https://tech-troop.co.il/gen-ai/' }
      ]
    },
    {
      type: 'education',
      title: 'Wix Jumpstart — Reservists Tech Training Program',
      company: 'Wix & Milumentor',
      period: '2/2026 – 5/2026',
      location: 'Wix Campus, Tel Aviv',
      description: 'Selective training program by Wix in collaboration with Milumentor, helping reservists bridge the gap between academic theory and industry reality. Hands-on sprints in small mentor-led squads at the Wix Campus, each session ending with a mock technical interview. Built and shipped real projects, including a production-deployed Weather App.',
      highlights: [
        'React Component Architecture',
        'Async JS & API Integration',
        'State Management (Hooks/Context)',
        'CI/CD & Deployment',
        'LLM Integration (LangChain, Claude API)',
        'Mock Technical Interviews'
      ],
      links: [
        { label: 'Weather App Project', url: 'https://github.com/Amit-Malka/Weather-App' },
        { label: 'Program Site', url: 'https://www.wixjumpstart.com/' }
      ]
    },
    {
      type: 'education',
      title: 'AI Development Course',
      company: 'Ben-Gurion University & The Institute',
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

  const getIcon = (type: 'education' | 'work' | 'project') => {
    switch (type) {
      case 'education':
        return <GraduationCap size={20} />;
      case 'work':
      case 'project':
        return <Briefcase size={20} />;
    }
  };


  return (
    <section id="experience" className="relative scroll-mt-24 min-h-screen bg-gradient-to-br from-primary via-background-light to-primary py-20">
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">Experience & Education</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
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
              key={experience.title}
              className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:text-left md:pr-8' : 'md:text-left md:pl-8'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Timeline marker */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-primary rounded-full items-center justify-center text-white shadow-md border-4 border-background-dark">
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

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {experience.period}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {experience.location}
                  </div>
                </div>

                <p className="text-gray-200 leading-relaxed mb-6">{experience.description}</p>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  {experience.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 bg-secondary/20 text-white border border-secondary/30 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </motion.div>

                {experience.links && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {experience.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent hover:text-white text-sm font-medium transition-colors duration-300"
                      >
                        {link.url.includes('github.com') ? <Github size={16} /> : <ExternalLink size={16} />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;