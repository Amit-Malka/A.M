# Editorial Craft Portfolio Redesign

**Date:** 2026-07-20  
**Branch:** `redesign/editorial-craft`  
**Status:** Approved / implemented on redesign/editorial-craft  
**Live site:** https://amit-malka.vercel.app/

## Goal

Replace the generic “AI portfolio” look (dark navy, purple-blue glow, Inter, circular glowing portrait) with an **Editorial Craft** design that feels intentional and designer-made, while keeping all existing content and section order.

## Non-negotiables

1. **Content preserved** — copy, projects, experience entries, skills, contact fields stay; no content invention or removal unless asked later.
2. **Section order fixed:** Hero → About → Skills → Experience → Projects → Work With Me → Contact.
3. **Responsive** — mobile-first; usable at ~360px width and up.
4. **Light + dark mode** — system preference default, header toggle, persisted choice.
5. **Scroll depth** — restrained scroll-linked motion only; respect `prefers-reduced-motion`.
6. **Featured Projects** becomes a **carousel** (manual control; no autoplay).

## Visual direction: Editorial Craft

- Typography-led hierarchy; name and type carry brand weight.
- Quiet surfaces, subtle borders, optional light grain — **no** glow orbs, gradient-clip name text, glass overload, or floating decorative dots.
- Photo treated as a real editorial image (rectangle / controlled crop), not a pulsing circular avatar.
- One accent color used sparingly for CTAs, links, and active carousel state.

## Color system (Urban Chic + terracotta CTA)

Derived from Urban Chic neutrals with a terracotta accent for actions.

| Token | Light | Dark | Role |
|-------|--------|------|------|
| `--bg` | `#F2E9E4` | `#22223B` | Page background |
| `--surface` | `#EDE4DF` | `#4A4E69` | Elevated panels, chips, form fields |
| `--border` | `#C9ADA7` | `#C9ADA7` | Dividers, outlines |
| `--text` | `#22223B` | `#F2E9E4` | Primary text |
| `--text-muted` | `#4A4E69` | `#C9ADA7` | Secondary text |
| `--accent` | `#C84B31` | `#E07A5F` | Buttons, links, active controls |

Rules:

- Implement as CSS custom properties (design tokens) switched by `[data-theme="light"|"dark"]` on `html` (or equivalent).
- Accent is ~10% of the UI: primary buttons, text links, active carousel indicator — not large gradient fills or glows.
- Meet WCAG AA for body text and interactive labels on both themes.

## Typography

- Replace Inter as the primary brand face.
- Pair: **display** (distinctive serif or neo-grotesk for H1/section titles) + **body** sans for paragraphs and UI.
- Use a fixed type scale (e.g. 14 / 16 / 18 / 24 / 40 / 64–72) and consistent tracking for large headlines.
- Load fonts via a privacy-friendly method (self-host or standard Google/Fontshare link in `index.html`); document chosen families in implementation.

## Theming behavior

1. On first visit: follow `prefers-color-scheme`.
2. Toggle in header switches light/dark and stores preference (`localStorage`).
3. Stored preference overrides system until cleared.
4. Theme change updates tokens without full remount flicker if practical.

## Section design

### Header

- Minimal: wordmark (name), condensed nav (or fewer visible links on small screens), theme toggle, mobile menu.
- On scroll: slight compress / solid background using surface tokens (no heavy glow shadow).
- Sticky; does not fight hero brand.

### Hero

- One composition: brand name (large), role line, short supporting sentence, CTA group (Download CV + Learn More), social links, editorial photo.
- Full-bleed or edge-aware layout; photo not inset card with glow ring.
- Soft parallax on photo only (disabled under reduced motion).

### About

- Editorial two-column on desktop: narrative left; four strengths as a quiet list/rail (not icon-card grid).
- Stack on mobile.

### Skills

- Grouped catalogs (Technical / AI tools / Professional) with compact chips or lists — less “badge wall,” clearer labels and spacing.

### Experience

- Vertical timeline; sticky period/label on desktop where helpful.
- Same entries and filters/content as today; restyle only.

### Projects (carousel)

- Replace the static featured grid with a **carousel**.
- One primary slide in focus; adjacent slides peek on desktop; full-bleed slides on mobile.
- Controls: previous / next, dots, keyboard arrows, touch swipe.
- **No autoplay** by default.
- Preserve per-project content: title, description, highlights, tech tags, imagery where already present.
- Reduced motion: instant or minimal crossfade, no elaborate slide physics.

### Work With Me

- Three service offerings as typography-led blocks with light dividers — not heavy shadowed cards.

### Contact

- Split layout: connect info + form; form-first stacking on mobile.
- Keep Formspree (or current) submission behavior; restyle only.

## Motion & scroll

Allowed:

- Section enter: short fade/rise.
- Header compress on scroll.
- Soft parallax on hero photo and project imagery only.
- Optional sticky section label or slim scroll progress on desktop.

Not allowed:

- Continuous glow pulses, bouncing orbs, sparkle backgrounds as primary atmosphere.
- Motion that obscures reading or hurts mobile performance.

Always honor `prefers-reduced-motion: reduce`.

## Architecture / implementation notes

- Stack remains CRA React 19 + TypeScript + Tailwind + Framer Motion unless a small addition is required for carousel (prefer Motion + CSS; avoid new heavy libraries unless necessary).
- Introduce a theme provider/hook and token-based Tailwind colors (CSS variables) so light/dark stay consistent.
- Prefer extending/refactoring existing components over a full rewrite; remove unused legacy CSS that fights the new system (many components still have unused `.css` files).
- Separation of concerns: theme tokens / layout chrome / section components / carousel logic kept distinct.

## Out of scope

- Changing section order or removing sections.
- Rewriting biography or inventing new projects.
- CMS, blog, or multi-page routing.
- Autoplay carousel.
- Keeping the old purple/glow visual language.

## Success criteria

- Site no longer reads as a generic dark purple AI template.
- Light and dark both look intentional and accessible.
- Same content and order; projects usable as a carousel on desktop and mobile.
- Scroll effects feel like depth, not decoration.
- Builds and runs with existing `npm start` / `npm run build`.

## Open implementation choices (non-blocking)

- Exact font pair (to be chosen during implementation within Editorial Craft constraints).
- Whether sticky section chrome is a left rail or top progress — pick one, keep it quiet.
