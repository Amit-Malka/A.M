# Task 5 Report: Hero — editorial composition

**Branch:** `redesign/editorial-craft`
**Date:** 2026-07-20
**Status:** DONE

---

## Summary

Restyled `Hero.tsx` to Editorial Craft tokens (`bg-bg`, `text-ink`, `text-muted`, `font-display`, `bg-accent`, `border-line`). Removed the circular glow ring, floating decorative orb divs, pulsing box-shadow animation, and `bg-gradient-primary`/`bg-clip-text` name treatment. Photo is now `aspect-[4/5]` rectangular with `border border-line`, `object-cover`. Parallax uses `useScroll`/`useTransform` on the photo wrapper only, gated by `usePrefersReducedMotion()` (returns static `y: '0%'` when reduced motion is preferred). Primary CTA is `bg-accent text-bg`, secondary is `border border-line`; social links restyled to bordered squares instead of glass circles. All existing copy, CTAs (Download CV / Learn More → `#about`), and social URLs (LinkedIn/GitHub) preserved verbatim. Deleted unused `Hero.css` (confirmed no imports repo-wide).

## Test evidence

- `usePrefersReducedMotion` calls `window.matchMedia`, which jsdom doesn't implement by default — this broke `App.test.tsx` (`renders hero heading with name`) once Hero adopted the hook. Fixed by adding a minimal `window.matchMedia` stub to `src/setupTests.ts` (global test infra fix, not component-specific), since this hook will be reused by other sections.
- `npm test -- --watchAll=false`: 3 suites (`App.test.tsx`, `ThemeProvider.test.tsx`, `Header.test.tsx`), 4 tests — all PASS. Existing hero heading test (`/Amit Malka/`) passes unchanged.
- `npx tsc --noEmit` — clean.

## Commits

| SHA | Subject |
|-----|---------|
| `0ed7802` | feat: restyle hero with editorial photo and quiet motion |

Files: `src/components/Hero.tsx` (modified), `src/components/Hero.css` (deleted), `src/setupTests.ts` (modified — matchMedia stub).

## Concerns

- `src/setupTests.ts` was touched outside the brief's file list to unblock testing of `usePrefersReducedMotion` globally; this is shared test infra and will benefit later tasks (About/Skills/Projects) that also gate motion on reduced-motion preference.
- Did not add a dedicated `Hero.test.tsx`; relied on existing `App.test.tsx` heading assertion per brief.

**Report path:** `.superpowers/sdd/task-5-report.md`
