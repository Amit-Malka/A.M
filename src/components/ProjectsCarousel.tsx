import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import ProjectSlide from './ProjectSlide';
import { Project } from '../utils/projectData';

interface ProjectsCarouselProps {
  projects: Project[];
}

const SWIPE_THRESHOLD_PX = 50;

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const count = projects.length;
  const pointerStartX = useRef<number | null>(null);

  const goTo = (targetIndex: number) => setIndex(((targetIndex % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (delta > SWIPE_THRESHOLD_PX) {
      prev();
    } else if (delta < -SWIPE_THRESHOLD_PX) {
      next();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none"
    >
      <div className="flex items-center justify-end gap-3 mb-6">
        <button
          type="button"
          aria-label="Previous project"
          onClick={prev}
          className="p-2 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={next}
          className="p-2 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        className="relative overflow-hidden lg:px-[9%]"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: prefersReducedMotion ? 'none' : 'transform 0.5s ease',
          }}
        >
          {projects.map((project, i) => {
            const isActive = i === index;
            return (
              <div
                key={project.id}
                className="w-full flex-shrink-0 px-2 lg:px-3"
                aria-hidden={!isActive}
                inert={isActive ? undefined : true}
              >
                <ProjectSlide project={project} />
              </div>
            );
          })}
        </div>
      </div>

      <div role="tablist" aria-label="Project slides" className="flex items-center justify-center gap-2 mt-8">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${project.title}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-accent' : 'w-2 bg-line'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
