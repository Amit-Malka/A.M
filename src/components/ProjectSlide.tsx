import React from 'react';
import { Github, ExternalLink, Zap, Award, Brain, BarChart3, Database, type LucideIcon } from 'lucide-react';
import { Project } from '../utils/projectData';

const iconMap: Record<string, LucideIcon> = { Award, Brain, BarChart3, Database, Zap };

interface ProjectSlideProps {
  project: Project;
}

const ProjectSlide: React.FC<ProjectSlideProps> = ({ project }) => {
  const IconComponent = iconMap[project.icon] ?? Zap;

  return (
    <article className="h-full bg-surface border border-line rounded-2xl p-8 lg:p-10 flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-accent" aria-hidden="true">
          <IconComponent size={22} />
        </span>
        <span className="text-xs uppercase tracking-wider text-muted">{project.category}</span>
      </div>

      <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4">{project.title}</h3>
      <p className="text-muted leading-relaxed mb-6">{project.description}</p>

      <ul className="space-y-2 mb-6">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-ink">
            <Zap size={14} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-bg border border-line text-ink rounded-md text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
        >
          <Github size={16} />
          View Code
        </a>

        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectSlide;
