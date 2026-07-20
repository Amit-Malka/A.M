# Task 7 Report: Projects carousel (core)

**Status:** Complete
**Branch:** `redesign/editorial-craft`

## TDD evidence

**RED** — `src/components/ProjectsCarousel.test.tsx` written verbatim from brief before implementation existed:

```
FAIL src/components/ProjectsCarousel.test.tsx
  ● Test suite failed to run
    Cannot find module './ProjectsCarousel' from 'src/components/ProjectsCarousel.test.tsx'
Test Suites: 1 failed, 1 total
```

**GREEN** — after implementing `ProjectSlide.tsx` + `ProjectsCarousel.tsx` and wiring `Projects.tsx`:

```
PASS src/components/ProjectsCarousel.test.tsx
  √ shows first project title and advances on next (209 ms)
  √ wraps from last to first (228 ms)
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

Full suite afterward: `Test Suites: 4 passed, 4 total` / `Tests: 6 passed, 6 total`.

## Changes

- **`ProjectSlide.tsx`** (new): renders one project's icon, category, title, description, highlights, technologies, and GitHub/live-demo links using editorial tokens (`bg-surface`, `border-line`, `text-ink`, `text-muted`, `text-accent`, `font-display`). Reuses the icon map from the old `ProjectCard`. No hover glow/scale.
- **`ProjectsCarousel.tsx`** (new): manual carousel, no autoplay.
  - `index` state with `goTo/next/prev`, wrap-around via `((i % count) + count) % count`.
  - Prev/Next buttons (`aria-label="Previous project"` / `"Next project"`).
  - Dots as `role="tablist"` / `role="tab"` with `aria-selected` and `aria-label="Go to {title}"`.
  - Keyboard: `onKeyDown` on the `role="region"` container — ArrowRight → next, ArrowLeft → prev.
  - Swipe: `onPointerDown`/`onPointerUp` delta > 50px triggers next/prev.
  - Peek layout: all slides render in a flex track, outer viewport gets `lg:px-[9%]` so neighbor slides peek on desktop; translated via `translateX(-index * 100%)`. Non-active slides get `aria-hidden` + `inert` so only the active slide's heading/links are in the accessibility tree and tab order (this is what keeps the test's `getByRole('heading', ...)` query unique despite all slides being mounted).
  - `usePrefersReducedMotion()` sets the track's CSS `transition` to `'none'` instead of `'transform 0.5s ease'` when reduced motion is preferred.
  - Region: `role="region"`, `aria-roledescription="carousel"`, `aria-label="Featured projects"`.
- **`Projects.tsx`**: kept section id/title/subtitle copy; replaced the `ProjectCard` grid with `<ProjectsCarousel projects={projectsData} />`. Section now uses `bg-bg`/`text-ink`/`text-muted`/`font-display` tokens and `usePrefersReducedMotion` for the heading's rise-in (matching About/Skills/Experience pattern).
- `projectsData` in `src/utils/projectData.ts` is unchanged — all 4 projects' titles, descriptions, highlights, technologies, and links are preserved verbatim.
- **Deleted `ProjectCard.tsx`**: no longer imported anywhere after the rewrite (confirmed via repo-wide search before deleting).
- **Deleted `Projects.css`**: was already unreferenced (co-located legacy CSS from before Tailwind conversion).

## Build/test summary

- `npm test -- --watchAll=false`: 4 suites / 6 tests passed (includes the 2 new carousel tests).
- `npm run build`: Compiled successfully, no new warnings.
- No linter errors in any new/edited file.

## Concerns

- Peek/translate carousel layout was verified via build + unit tests only, not a manual `npm start` visual/browser check (light/dark, swipe on a real touch device, keyboard focus ring).
- Non-active slides remain in the DOM (for the peek effect) but are excluded from the accessibility tree via `aria-hidden` + `inert`; this is intentional and is what testing-library's `getByRole` relies on to resolve a single match, but is worth a manual screen-reader/tab-order smoke check later.

**Report path:** `.superpowers/sdd/task-7-report.md`

## Review fixes (Critical/Important findings)

1. **Visible focus on carousel region (Critical):** `outline-none` on the `role="region"` container left keyboard focus invisible. Added `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg` (plus `rounded-md` so the ring renders cleanly) using existing editorial tokens.
2. **Focus loss on slide change via `inert` (Important):** When `index` changes, the previously active slide becomes `inert`, and any focused link inside it blurs to `<body>`. `goTo` now calls `regionRef.current?.focus({ preventScroll: true })` after every index update (covers next/prev/dot-click/keyboard, since all paths funnel through `goTo`), so keyboard users land back on the focus-visible region instead of losing their place.
3. **Wrap-around rewind (optional polish, done):** `next()`/`prev()` now detect the last→first / first→last transition and set the track's `transition` to `'none'` for one frame (`transitionEnabled` state, reset via `requestAnimationFrame`) so wrapping snaps directly instead of animating backwards through every intermediate slide. Reduced-motion path (`prefersReducedMotion`) is unaffected — it already forces `transition: 'none'` unconditionally.

### Test results after fix

```
npm test -- --watchAll=false src/components/ProjectsCarousel.test.tsx

PASS src/components/ProjectsCarousel.test.tsx
  √ shows first project title and advances on next (309 ms)
  √ wraps from last to first (265 ms)
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

No new tests were added — existing navigation tests (next/wrap) continue to exercise the `goTo` path that now also handles focus and wrap-transition logic, and the focus-visible ring is a pure CSS class with no new behavior to unit-test in jsdom.
