### Task 7: Projects carousel (core)

**Files:**
- Create: `src/components/ProjectSlide.tsx`
- Create: `src/components/ProjectsCarousel.tsx`
- Create: `src/components/ProjectsCarousel.test.tsx`
- Modify: `src/components/Projects.tsx`
- Optionally deprecate: `src/components/ProjectCard.tsx` (stop using; delete if unused)

**Interfaces:**
- Consumes: `projectsData: Project[]` from `src/utils/projectData.ts` (unchanged)
- Produces:
  - `ProjectsCarousel({ projects: Project[] })`
  - State: `index: number`; `goTo(i)`, `next()`, `prev()` with wrap-around
  - No autoplay timer
  - Keyboard: ArrowLeft / ArrowRight when carousel focused
  - Dots + prev/next buttons with aria labels
  - Swipe: pointer/touch delta > 50px triggers next/prev

- [ ] **Step 1: Write failing carousel tests**

```tsx
// src/components/ProjectsCarousel.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsCarousel from './ProjectsCarousel';
import { projectsData } from '../utils/projectData';

test('shows first project title and advances on next', async () => {
  const user = userEvent.setup();
  render(<ProjectsCarousel projects={projectsData} />);
  expect(screen.getByRole('heading', { name: projectsData[0].title })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /next project/i }));
  expect(screen.getByRole('heading', { name: projectsData[1].title })).toBeInTheDocument();
});

test('wraps from last to first', async () => {
  const user = userEvent.setup();
  render(<ProjectsCarousel projects={projectsData} />);
  const next = screen.getByRole('button', { name: /next project/i });
  for (let i = 0; i < projectsData.length; i += 1) {
    await user.click(next);
  }
  expect(screen.getByRole('heading', { name: projectsData[0].title })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run ג€” expect FAIL**

Run: `npm test -- --watchAll=false src/components/ProjectsCarousel.test.tsx`

- [ ] **Step 3: Implement ProjectSlide**

Render title, description, highlights, technologies, GitHub / liveDemo links using token classes. Reuse icon map from old `ProjectCard` if useful. No glow hover.

- [ ] **Step 4: Implement ProjectsCarousel**

```tsx
// Behavioral skeleton ג€” flesh out JSX with editorial layout
type Props = { projects: Project[] };

const ProjectsCarousel: React.FC<Props> = ({ projects }) => {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const count = projects.length;

  const goTo = (i: number) => setIndex((i + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // onKeyDown on region: ArrowRight -> next, ArrowLeft -> prev
  // onPointerDown/Up for swipe
  // AnimatePresence mode="wait" with duration 0 if reduced

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      className="outline-none"
    >
      {/* track: show active ProjectSlide; peek neighbors on lg via translate */}
      <button type="button" aria-label="Previous project" onClick={prev}>ג€¦</button>
      <button type="button" aria-label="Next project" onClick={next}>ג€¦</button>
      <div role="tablist" aria-label="Project slides">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${p.title}`}
            onClick={() => goTo(i)}
            className={i === index ? 'bg-accent' : 'bg-line'}
          />
        ))}
      </div>
    </div>
  );
};
```

Desktop peek: outer overflow-hidden; inner flex with slides at ~80ג€“85% width and gap; translateX by index. Mobile: 100% width slides.

- [ ] **Step 5: Wire Projects.tsx**

Keep section title/subtitle copy. Replace grid with `<ProjectsCarousel projects={projectsData} />`. Token section classes.

- [ ] **Step 6: Run carousel tests ג€” PASS**

- [ ] **Step 7: Commit**

```bash
git add src/components/Projects.tsx src/components/ProjectsCarousel.tsx src/components/ProjectSlide.tsx src/components/ProjectsCarousel.test.tsx
git add -u src/components/ProjectCard.tsx src/components/Projects.css
git commit -m "feat: replace projects grid with manual carousel"
```

---

