# Task 9 Report: Cleanup + final verification

## Step 1: Grep for banned leftovers

Command:

```
rg -n "3953ab|background-dark|gradient-primary|font-inter|DynamicBackground|animate-glow|animate-sparkle" --glob '!node_modules' --glob '!build' .
```

Found and fixed (before cleanup):

- `src\components\DynamicBackground.tsx` — unused component (no imports anywhere in `src`); contained `#3953ab` gradient orb and `animate-glow`-adjacent styling. **Deleted.**
- `src\App.css` — `.animate-glow` selector (dead; class never applied in any component). **Removed** along with the whole unused hardware-acceleration/hover block (`.animate-float`, `.animate-particle-float`, `.animate-gradient-shift`, `.hover\:scale-105`, `.hover\:-translate-y-1`) and the duplicate `prefers-reduced-motion` media query (already present in `src/index.css`). `App.css` now only keeps `html { scroll-behavior: smooth; }`.
- `tailwind.config.js` — legacy `animation`/`keyframes`/`backgroundImage` blocks (`float`, `glow`, `gradient-shift`, `particle-float`, `sparkle`, `pulse-glow`, `slide-in`, `fade-in`, `scale-in`, `bounce-subtle`, `shimmer`, `gradient-primary` containing `#3953ab`). None referenced anywhere in `src` (verified via `rg` for `animate-*` and `bg-gradient-*` usage — zero hits). **Removed**, keeping only `colors` and `fontFamily` (both actively used).
- `public\favicon.svg` — old AI-template neural-network mark using gradient `#111933 → #3953ab`. **Replaced** with a simple paper/terracotta monogram using the new token colors (`#F2E9E4` bg, `#C84B31` accent), no gradients/glow.

Re-run after fixes — remaining matches are only in historical planning docs (`docs/superpowers/plans/2026-07-20-editorial-craft-redesign.md`), which is expected/acceptable per the brief ("or only in comments/docs"):

```
.\docs\superpowers\plans\2026-07-20-editorial-craft-redesign.md (multiple lines, plan/spec prose only)
```

No matches remain in `src`, `public`, `tailwind.config.js`, or any other source file.

## Step 2: DynamicBackground.tsx

Confirmed zero imports/usages across `src` (`rg -n "DynamicBackground" src` → no matches after deletion check). Deleted `src/components/DynamicBackground.tsx`.

## Step 3: Leftover unused CSS

- `src/App.css`: stripped to just `scroll-behavior: smooth`; removed dead animation/hover rules and the duplicate reduced-motion block (kept the one in `src/index.css`, which is the active theming stylesheet with the light/dark tokens).
- Checked for co-located component `*.css` files (`Get-ChildItem -Recurse -Include *.css` under `src`) — only `App.css` and `index.css` exist; no other legacy per-component CSS to remove.
- `tailwind.config.js`: removed unused legacy `animation`/`keyframes`/`backgroundImage` config that fought/duplicated the new token system.

## Step 4: Full test suite

Command (with `CI=true` so Jest runs the whole suite instead of only-changed-since-last-commit):

```
$env:CI = "true"; npm test -- --watchAll=false
```

Result:

```
PASS src/theme/ThemeProvider.test.tsx
PASS src/App.test.tsx
PASS src/components/Header.test.tsx
PASS src/components/ProjectsCarousel.test.tsx

Test Suites: 4 passed, 4 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        4.759 s
```

All PASS. ✅

## Step 5: Production build

Command: `npm run build`

Result:

```
Compiled successfully.

File sizes after gzip:
  117.69 kB          build\static\js\main.640dcaca.js
  4.14 kB (-318 B)   build\static\css\main.b39b7dcd.css
  1.77 kB            build\static\js\453.23272502.chunk.js

The build folder is ready to be deployed.
```

Build succeeds; CSS bundle shrank by 318 B after removing dead rules — confirms the removed CSS/Tailwind config was indeed unused. ✅

## Step 6: Design spec status

Updated `docs/superpowers/specs/2026-07-20-editorial-craft-redesign-design.md` status line from
`Approved (pending user review of this written spec)` to `Approved / implemented on redesign/editorial-craft`.

## README

Skipped — no user ask, no font/theme mention required beyond what's already accurate.

## Manual checklist (Step 4 of brief)

Not executed in this automated pass (requires a running browser session); left for developer/user manual QA per brief:

- [ ] Light mode: paper bg, terracotta CTAs, readable text
- [ ] Dark mode: ink bg, brighter accent, readable text
- [ ] Toggle persists after refresh
- [ ] Section order unchanged
- [ ] Carousel: next/prev/dots/keyboard/swipe; no autoplay
- [ ] Mobile ~360px: nav, hero, carousel usable
- [ ] Reduced motion: no parallax / heavy transitions

## Files changed

- Deleted: `src/components/DynamicBackground.tsx`
- Modified: `src/App.css` (stripped dead rules)
- Modified: `tailwind.config.js` (removed unused legacy animation/keyframes/backgroundImage)
- Modified: `public/favicon.svg` (replaced AI neural-network mark with token-based monogram)
- Modified: `docs/superpowers/specs/2026-07-20-editorial-craft-redesign-design.md` (status line)

## Final whole-branch review fixups

Addressed the "Must fix" and "Should fix" findings from the final branch review:

1. **Hero reduced-motion gating** (`src/components/Hero.tsx`): added a `fadeIn(delay, y)` helper that returns `initial={false}` (skips the entrance transform entirely) and `duration: 0` when `usePrefersReducedMotion()` is true, applied to the heading/subheading/paragraph/CTA/social/photo-wrapper/scroll-indicator `motion` elements — same pattern as `About`/`Skills`. The social-link `Variants` (`hidden`/`visible`) were also updated to drop the `y` offset and delay/duration when reduced. Photo parallax (`photoY`) was already gated and left untouched.
2. **JS smooth-scroll**: `Hero.scrollToAbout` and `Header.scrollToSection` now call `scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })`; `Header` now imports and calls `usePrefersReducedMotion()`.
3. **Contact error color**: added a `--danger` CSS variable (`#B91C1C` light / `#F87171` dark) in `src/index.css`, wired it up as `danger` in `tailwind.config.js`, and swapped `Contact.tsx`'s hardcoded `text-red-500` for `text-danger`.
4. **Carousel focus rings**: added `outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg` to the Previous/Next buttons in `ProjectsCarousel.tsx`, matching the region's existing focus-ring family.

### Tests

```
npm test -- --watchAll=false
```

Result: `Test Suites: 3 passed, 3 total`, `Tests: 4 passed, 4 total` (Jest scoped to changed-file-related suites; no failures).

### Files changed (this pass)

- Modified: `src/components/Hero.tsx`
- Modified: `src/components/Header.tsx`
- Modified: `src/components/Contact.tsx`
- Modified: `src/components/ProjectsCarousel.tsx`
- Modified: `src/index.css`
- Modified: `tailwind.config.js`
