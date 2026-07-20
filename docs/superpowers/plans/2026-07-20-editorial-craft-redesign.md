# Editorial Craft Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Amit Malka’s CRA portfolio into Editorial Craft (Urban Chic + terracotta), with light/dark themes and a Featured Projects carousel, without changing content or section order.

**Architecture:** CSS design tokens on `html[data-theme]` drive Tailwind colors. A small `ThemeProvider` resolves system preference + `localStorage` and exposes `theme` / `toggleTheme`. Section components keep their data and ids; visuals and Projects layout change. Carousel state lives in a dedicated `ProjectsCarousel` component. Framer Motion handles restrained scroll enters and optional parallax; `prefers-reduced-motion` disables non-essential motion.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 3, Framer Motion, CRA (`react-scripts`), Testing Library / Jest. Fonts: **Fraunces** (display) + **Source Sans 3** (body) via Google Fonts. No new carousel library.

## Global Constraints

- Branch: `redesign/editorial-craft` only (do not commit to `main`).
- Content preserved; section order: Hero → About → Skills → Experience → Projects → Work With Me → Contact.
- Tokens: light/dark Urban Chic + terracotta per `docs/superpowers/specs/2026-07-20-editorial-craft-redesign-design.md`.
- No purple glow, Inter, gradient-clip name, floating orbs, or `DynamicBackground` AI atmosphere.
- Carousel: manual only (prev/next, dots, keyboard, swipe); **no autoplay**.
- Keep Formspree endpoint `https://formspree.io/f/mvgggrzo` and `projectsData` / experience copy unchanged.
- Mobile-first (~360px+); WCAG AA text contrast on both themes.
- Honor `prefers-reduced-motion: reduce`.

## File structure (create / modify)

| Path | Responsibility |
|------|----------------|
| `src/theme/ThemeProvider.tsx` | Theme resolve, persist, context |
| `src/theme/theme.ts` | Types + storage key + resolve helper |
| `src/theme/ThemeProvider.test.tsx` | Theme behavior tests |
| `src/index.css` | Token CSS variables + base |
| `tailwind.config.js` | Map colors/fonts to CSS vars |
| `public/index.html` | Fraunces + Source Sans 3; theme-color |
| `src/index.tsx` | Wrap app in ThemeProvider |
| `src/App.tsx` | Shell; remove DynamicBackground; token bg |
| `src/components/ScrollProgress.tsx` | Slim top scroll progress (desktop-friendly) |
| `src/hooks/usePrefersReducedMotion.ts` | Reduced-motion flag |
| `src/components/Header.tsx` | Editorial header + theme toggle |
| `src/components/Hero.tsx` | Editorial hero + photo parallax |
| `src/components/About.tsx` | Two-column editorial about |
| `src/components/Skills.tsx` | Catalog chips |
| `src/components/Experience.tsx` | Quiet timeline |
| `src/components/Projects.tsx` | Section chrome; host carousel |
| `src/components/ProjectsCarousel.tsx` | Carousel behavior + layout |
| `src/components/ProjectsCarousel.test.tsx` | Carousel tests |
| `src/components/ProjectSlide.tsx` | Single project slide content (from ProjectCard data) |
| `src/components/WorkWithMe.tsx` | Typography service blocks |
| `src/components/Contact.tsx` | Split contact; keep Formspree |
| Delete or stop importing: `DynamicBackground.tsx`, unused `*.css` co-located files that fight tokens |

---

### Task 1: Theme resolve helpers + ThemeProvider

**Files:**
- Create: `src/theme/theme.ts`
- Create: `src/theme/ThemeProvider.tsx`
- Create: `src/theme/ThemeProvider.test.tsx`
- Modify: `src/index.tsx`

**Interfaces:**
- Consumes: `window.matchMedia`, `localStorage`
- Produces:
  - `export type Theme = 'light' | 'dark'`
  - `export const THEME_STORAGE_KEY = 'am-portfolio-theme'`
  - `export function getSystemTheme(): Theme`
  - `export function readStoredTheme(): Theme | null`
  - `export function resolveInitialTheme(): Theme`
  - `export function applyThemeToDocument(theme: Theme): void`
  - `ThemeProvider` with context `{ theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void }`
  - `export function useTheme(): { theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void }`

- [ ] **Step 1: Write failing tests**

```tsx
// src/theme/ThemeProvider.test.tsx
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { THEME_STORAGE_KEY, resolveInitialTheme, applyThemeToDocument } from './theme';

function Probe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      {theme}
    </button>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

test('resolveInitialTheme uses system when nothing stored', () => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes('dark'),
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  expect(resolveInitialTheme()).toBe('dark');
});

test('toggleTheme flips theme and persists', async () => {
  localStorage.setItem(THEME_STORAGE_KEY, 'light');
  applyThemeToDocument('light');
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  expect(screen.getByRole('button')).toHaveTextContent('light');
  await user.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `npm test -- --watchAll=false src/theme/ThemeProvider.test.tsx`  
Expected: FAIL (module not found / export missing)

- [ ] **Step 3: Implement theme helpers + provider**

```ts
// src/theme/theme.ts
export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'am-portfolio-theme';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function readStoredTheme(): Theme | null {
  const value = localStorage.getItem(THEME_STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

export function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme();
}

export function applyThemeToDocument(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}
```

```tsx
// src/theme/ThemeProvider.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Theme,
  applyThemeToDocument,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
} from './theme';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => resolveInitialTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

Wrap in `src/index.tsx`:

```tsx
import { ThemeProvider } from './theme/ThemeProvider';
// ...
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test -- --watchAll=false src/theme/ThemeProvider.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/theme src/index.tsx
git commit -m "feat: add theme provider with system and stored preference"
```

---

### Task 2: Design tokens, fonts, Tailwind mapping

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Modify: `public/index.html`
- Modify: `src/App.tsx` (token background class only if needed for smoke)

**Interfaces:**
- Consumes: `data-theme` from Task 1
- Produces: CSS vars `--bg`, `--surface`, `--border`, `--text`, `--text-muted`, `--accent`; Tailwind colors `bg`, `surface`, `border`, `ink`, `muted`, `accent`; fonts `font-display`, `font-sans`

- [ ] **Step 1: Replace Inter in `public/index.html` with Fraunces + Source Sans 3**

Remove Inter preload/stylesheet links. Add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
<meta name="theme-color" content="#F2E9E4" />
```

- [ ] **Step 2: Write token CSS in `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root,
html[data-theme="light"] {
  --bg: #F2E9E4;
  --surface: #EDE4DF;
  --border: #C9ADA7;
  --text: #22223B;
  --text-muted: #4A4E69;
  --accent: #C84B31;
}

html[data-theme="dark"] {
  --bg: #22223B;
  --surface: #4A4E69;
  --border: #C9ADA7;
  --text: #F2E9E4;
  --text-muted: #C9ADA7;
  --accent: #E07A5F;
}

html {
  color-scheme: light dark;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "Source Sans 3", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Update `tailwind.config.js` theme.extend**

Replace old `primary`/`secondary`/`accent`/`background-*`/`inter` with:

```js
colors: {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  line: 'var(--border)',
  ink: 'var(--text)',
  muted: 'var(--text-muted)',
  accent: 'var(--accent)',
},
fontFamily: {
  display: ['Fraunces', 'Georgia', 'serif'],
  sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
},
```

Remove glow/sparkle-centric keyframes that won’t be used (or leave unused — prefer delete to avoid temptation). Keep only if still referenced after redesign; otherwise delete `glow`, `sparkle`, `pulse-glow`, `particle-float`, `shimmer`, `gradient-primary`.

- [ ] **Step 4: Smoke App shell**

In `App.tsx` use `min-h-screen bg-bg text-ink font-sans` and remove `<DynamicBackground />` import/usage.

- [ ] **Step 5: Verify build compiles**

Run: `npm run build`  
Expected: compiled successfully (warnings OK if no errors)

- [ ] **Step 6: Commit**

```bash
git add src/index.css tailwind.config.js public/index.html src/App.tsx
git commit -m "feat: wire Urban Chic tokens, fonts, and Tailwind mapping"
```

---

### Task 3: Reduced-motion hook + scroll progress

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.ts`
- Create: `src/components/ScrollProgress.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean`
- Produces: `<ScrollProgress />` — fixed top bar width = scroll %

- [ ] **Step 1: Implement hook**

```ts
// src/hooks/usePrefersReducedMotion.ts
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Implement ScrollProgress**

```tsx
// src/components/ScrollProgress.tsx
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
      aria-hidden
    >
      <div className="h-full bg-accent origin-left" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgress;
```

- [ ] **Step 3: Mount in `App.tsx` after Header** (or before): `<ScrollProgress />`

- [ ] **Step 4: Commit**

```bash
git add src/hooks/usePrefersReducedMotion.ts src/components/ScrollProgress.tsx src/App.tsx
git commit -m "feat: add reduced-motion hook and scroll progress bar"
```

---

### Task 4: Header — editorial + theme toggle

**Files:**
- Modify: `src/components/Header.tsx`
- Delete unused: `src/components/Header.css` (if unused)
- Test: extend or add `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: `useTheme()` from Task 1
- Keeps: same `menuItems` ids (`hero`, `about`, `skills`, `experience`, `projects`, `work-with-me`, `contact`)

- [ ] **Step 1: Write test for theme toggle presence**

```tsx
// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '../theme/ThemeProvider';

test('renders theme toggle', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
  expect(screen.getByRole('button', { name: /toggle (dark|light) mode/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run — expect FAIL** (no accessible name yet)

- [ ] **Step 3: Restyle Header**

Requirements while editing `Header.tsx`:

- Classes use `bg-bg/90`, `border-line`, `text-ink`, `text-muted`, `font-display` for wordmark — **no** `bg-gradient-primary`, `shadow-secondary`, purple glow.
- Add theme toggle button: `aria-label={theme === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}` calling `toggleTheme()`.
- Icons: `Sun` / `Moon` from `lucide-react`.
- Scroll state: `border-b border-line bg-bg/95 backdrop-blur` when scrolled; transparent when at top.
- Mobile menu unchanged in behavior; restyle to tokens.

- [ ] **Step 4: Run Header test — PASS**

Run: `npm test -- --watchAll=false src/components/Header.test.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx
git add -u src/components/Header.css
git commit -m "feat: restyle header with theme toggle"
```

---

### Task 5: Hero — editorial composition

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/App.test.tsx` or keep existing hero name test
- Delete unused: `src/components/Hero.css` if unused

**Interfaces:**
- Consumes: `usePrefersReducedMotion`, `downloadCV`, existing copy and image `/images/me.jpg`
- Produces: rectangular photo; soft parallax only when motion OK

- [ ] **Step 1: Confirm existing test still defines success**

Existing `src/App.test.tsx` / Hero test: heading `/Amit Malka/` must still pass after restyle.

- [ ] **Step 2: Restyle Hero.tsx**

Must keep:

- Name “Amit Malka”, subtitle “AI Developer & Data Analyst”, description paragraph, Download CV, Learn More → `#about`, LinkedIn/GitHub URLs.

Must change:

- Remove circular glow ring, floating orb divs, `bg-gradient-primary` text clip.
- Photo: `aspect-[4/5]` or similar rectangular crop, `border border-line`, no `rounded-full` glow.
- Typography: `font-display` for h1; `text-ink` / `text-muted`.
- CTAs: primary `bg-accent text-bg` (or white text on accent), secondary `border border-line`.
- Parallax: `useScroll` + `useTransform` on photo only; if `usePrefersReducedMotion()` then static.

Sketch structure:

```tsx
<section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 bg-bg">
  <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
    {/* text column: h1 font-display, h2, p, buttons, social */}
    {/* photo column: motion.div style={{ y }} with img object-cover */}
  </div>
</section>
```

- [ ] **Step 3: Run** `npm test -- --watchAll=false` (at least Hero/App tests) — PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git add -u src/components/Hero.css
git commit -m "feat: restyle hero with editorial photo and quiet motion"
```

---

### Task 6: About, Skills, Experience restyle

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/Skills.tsx`
- Modify: `src/components/Experience.tsx`
- Remove unused co-located CSS if present

**Interfaces:**
- Consumes: existing section copy/data structures inside those files (do not invent new bio text)
- Section ids remain `about`, `skills`, `experience`

- [ ] **Step 1: About**

- Two-column desktop: narrative | strengths list (plain list with border-t dividers, not icon cards).
- Tokens: `bg-bg`, `text-ink`, `text-muted`, `font-display` for title.
- `whileInView` fade/rise; skip transform when reduced motion (use `usePrefersReducedMotion` to set `initial={false}` or duration 0).

- [ ] **Step 2: Skills**

- Keep three groups and skill names.
- Compact chips: `bg-surface border border-line text-ink rounded-md` (not pill glow).
- Clear group headings.

- [ ] **Step 3: Experience**

- Keep all entries and tech tags.
- Vertical timeline with `border-l border-line`; sticky date label on `lg:` if already structured that way — restyle only.
- Remove purple gradient backgrounds.

- [ ] **Step 4: Visual smoke**

Run: `npm start` — manually scan About/Skills/Experience light+dark (toggle).  
Or: `npm run build` for compile check.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/Skills.tsx src/components/Experience.tsx
git add -u src/components/*.css
git commit -m "feat: restyle about, skills, and experience in editorial tokens"
```

---

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

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- --watchAll=false src/components/ProjectsCarousel.test.tsx`

- [ ] **Step 3: Implement ProjectSlide**

Render title, description, highlights, technologies, GitHub / liveDemo links using token classes. Reuse icon map from old `ProjectCard` if useful. No glow hover.

- [ ] **Step 4: Implement ProjectsCarousel**

```tsx
// Behavioral skeleton — flesh out JSX with editorial layout
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
      <button type="button" aria-label="Previous project" onClick={prev}>…</button>
      <button type="button" aria-label="Next project" onClick={next}>…</button>
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

Desktop peek: outer overflow-hidden; inner flex with slides at ~80–85% width and gap; translateX by index. Mobile: 100% width slides.

- [ ] **Step 5: Wire Projects.tsx**

Keep section title/subtitle copy. Replace grid with `<ProjectsCarousel projects={projectsData} />`. Token section classes.

- [ ] **Step 6: Run carousel tests — PASS**

- [ ] **Step 7: Commit**

```bash
git add src/components/Projects.tsx src/components/ProjectsCarousel.tsx src/components/ProjectSlide.tsx src/components/ProjectsCarousel.test.tsx
git add -u src/components/ProjectCard.tsx src/components/Projects.css
git commit -m "feat: replace projects grid with manual carousel"
```

---

### Task 8: Work With Me + Contact restyle

**Files:**
- Modify: `src/components/WorkWithMe.tsx`
- Modify: `src/components/Contact.tsx`

**Interfaces:**
- Contact keeps `fetch('https://formspree.io/f/mvgggrzo', …)` and same `formData` fields.
- Work With Me keeps three service blocks and bullet copy.

- [ ] **Step 1: WorkWithMe**

- Typography blocks separated by `border-t border-line`.
- Accent only on hover link or small label — not card glow.
- Section id `work-with-me` unchanged.

- [ ] **Step 2: Contact**

- Split: info column + form; on mobile form first (`order`).
- Inputs: `bg-surface border border-line text-ink`.
- Submit button: `bg-accent`.
- Preserve success/error states and Formspree logic.

- [ ] **Step 3: Build**

Run: `npm run build` — success

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkWithMe.tsx src/components/Contact.tsx
git add -u src/components/WorkWithMe.css src/components/Contact.css
git commit -m "feat: restyle work-with-me and contact for editorial theme"
```

---

### Task 9: Cleanup + final verification

**Files:**
- Delete: `src/components/DynamicBackground.tsx` if unused
- Delete leftover unused section CSS / `App.css` rules that reference old variables
- Modify: `docs/superpowers/specs/2026-07-20-editorial-craft-redesign-design.md` status line to `Approved / implemented on redesign/editorial-craft` (optional)
- Modify: `README.md` only if fonts/theme need a one-line mention (optional, skip if no user ask)

- [ ] **Step 1: Grep for banned leftovers**

Run:

```bash
rg "3953ab|background-dark|gradient-primary|font-inter|DynamicBackground|animate-glow|animate-sparkle" src
```

Expected: no matches (or only in comments/docs). Fix any remaining.

- [ ] **Step 2: Full test suite**

Run: `npm test -- --watchAll=false`  
Expected: all PASS

- [ ] **Step 3: Production build**

Run: `npm run build`  
Expected: success

- [ ] **Step 4: Manual checklist (developer)**

- [ ] Light mode: paper bg, terracotta CTAs, readable text  
- [ ] Dark mode: ink bg, brighter accent, readable text  
- [ ] Toggle persists after refresh  
- [ ] Section order unchanged  
- [ ] Carousel: next/prev/dots/keyboard/swipe; no autoplay  
- [ ] Mobile ~360px: nav, hero, carousel usable  
- [ ] Reduced motion: no parallax / heavy transitions  

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy AI-template styles and verify redesign"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Editorial Craft direction / no AI glow | 2, 4–8, 9 |
| Urban Chic + terracotta tokens | 2 |
| Light + dark + system + persist | 1, 4 |
| Fonts replace Inter | 2 |
| Section order + content | 4–8 (preserve) |
| Hero editorial photo + parallax | 5 |
| About two-column | 6 |
| Skills catalog | 6 |
| Experience timeline | 6 |
| Projects carousel, no autoplay | 7 |
| Work With Me / Contact | 8 |
| Scroll progress / reduced motion | 3, 5, 7 |
| Mobile responsive | all section tasks |
| Branch redesign | Global Constraints |

## Placeholder scan

No TBD/TODO left in task steps; font pair locked to Fraunces + Source Sans 3; sticky chrome locked to top `ScrollProgress` (not left rail).

## Type consistency

- `Theme`, `THEME_STORAGE_KEY`, `useTheme`, `applyThemeToDocument`, `resolveInitialTheme` named consistently across Tasks 1–4.
- Carousel uses `Project` from `projectData.ts` and `projectsData` unchanged.
