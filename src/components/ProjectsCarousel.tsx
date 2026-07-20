import React, { useEffect, useRef, useState } from 'react';
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
  const regionRef = useRef<HTMLDivElement>(null);
  // Suppresses the transform transition for one frame on wrap-around, so the
  // track snaps straight to the wrapped slide instead of animating backwards
  // through every slide in between. Re-enabled on the next frame.
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (transitionEnabled) return undefined;
    const raf = requestAnimationFrame(() => setTransitionEnabled(true));
    return () => cancelAnimationFrame(raf);
  }, [transitionEnabled]);

  // Any programmatic navigation (buttons, dots, or keyboard) can leave a slide's
  // link focused right before it becomes inert, which blurs focus to <body>.
  // Refocusing the region after the index changes keeps keyboard users in place.
  const goTo = (targetIndex: number, isWrap = false) => {
    if (isWrap) setTransitionEnabled(false);
    setIndex(((targetIndex % count) + count) % count);
    regionRef.current?.focus({ preventScroll: true });
  };
  const next = () => goTo(index + 1, index === count - 1);
  const prev = () => goTo(index - 1, index === 0);

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
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
            transition: prefersReducedMotion || !transitionEnabled ? 'none' : 'transform 0.5s ease',
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
