import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Github } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Experience: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

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
      title: 'MiluimAI - AI for Developers',
      company: 'TechTroop',
      period: '5/2026 – 7/2026',
      location: 'Israel',
      description: 'Practical training for developers in the AI era: AI-Native development workflows, working effectively with language models, and building LLM-based systems. Covers RAG systems connected to real data sources, agent and automation development, and modern AI system architecture, culminating in an LLM-based final project.',
      highlights: [
        'AI-Native Development (Cursor, Claude Code, Codex)',
        'Advanced Prompt Engineering',
        'RAG Pipelines & Vector DBs',
        'AI Agents & Automations (LangGraph, n8n)',
        'MCP'
      ],
      links: [
        { label: 'Course Page', url: 'https://tech-troop.co.il/gen-ai/' }
      ]
    },
    {
      type: 'education',
      title: 'Wix Jumpstart - Reservists Tech Training Program',
      company: 'Wix & Milumentor',
      period: '2/2026 – 5/2026',
      location: 'Wix Campus, Tel Aviv',
      description: 'Selective training program by Wix in collaboration with Milumentor, helping reservists bridge the gap between academic theory and industry reality. Hands-on sprints in small mentor-led squads at the Wix Campus. Built and shipped real projects.',
      highlights: [
        'React Component Architecture',
        'Async JS & API Integration',
        'State Management (Hooks/Context)',
        'CI/CD & Deployment',
        'LLM Integration (LangChain, Claude API)'
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
      description: 'From LLM fundamentals through production-ready RAG and agent systems. Covered transformer architecture and prompt engineering, built retrieval pipelines with vector databases and embeddings, designed Python agents with memory and tool use via MCP, and advanced workflows including multimodal input, hybrid retrieval, and evaluation metrics.',
      highlights: [
        'LLM\'s',
        'RAG Pipelines & Vector Databases',
        'MCP Protocol',
        'AI Agent Development (Python)',
        'Multimodal & Hybrid Retrieval',
        'Agent Evaluation & DSPy'
      ],
      links: [
        { label: 'Financial RAG Project', url: 'https://github.com/Amit-Malka/Financial-Hybrid-RAG-System' }
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

  const riseIn = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 },
  };

  return (
    <section id="experience" className="relative scroll-mt-24 bg-bg py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div className="mb-12" {...riseIn}>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Experience & Education</h2>
          <p className="text-lg text-muted max-w-2xl">
            My journey through AI development, research, and professional experience
          </p>
        </motion.div>

        <div className="relative border-l border-line pl-8 sm:pl-10">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              className="relative pb-14 last:pb-0 lg:grid lg:grid-cols-[180px_1fr] lg:gap-10"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
            >
              <span
                className="absolute -left-[calc(2rem+5px)] sm:-left-[calc(2.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                aria-hidden="true"
              />

              <div className="mb-2 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
                <div className="font-display text-lg text-ink">{experience.period}</div>
                <div className="text-xs uppercase tracking-wider text-muted mt-1">{experience.type}</div>
              </div>

              <div>
                <h3 className="font-display text-2xl text-ink mb-1">{experience.title}</h3>
                <div className="text-accent font-medium mb-3">{experience.company}</div>

                <div className="flex items-center gap-1.5 text-sm text-muted mb-4">
                  <MapPin size={14} />
                  {experience.location}
                </div>

                <p className="text-muted leading-relaxed mb-4">{experience.description}</p>

                <ul className="flex flex-wrap gap-2 mb-4">
                  {experience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="px-2.5 py-1 bg-surface border border-line text-ink rounded-md text-xs"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                {experience.links && (
                  <div className="flex flex-wrap gap-4">
                    {experience.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                      >
                        {link.url.includes('github.com') ? <Github size={14} /> : <ExternalLink size={14} />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
