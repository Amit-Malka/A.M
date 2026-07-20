# Task 4 Report: Header — editorial + theme toggle

**Branch:** `redesign/editorial-craft`
**Date:** 2026-07-20
**Status:** DONE

---

## Summary

Wrote `Header.test.tsx` (verbatim from brief) first, confirmed RED (no accessible theme-toggle name), then restyled `Header.tsx` to Editorial Craft tokens (`bg-bg`, `border-line`, `text-ink`, `text-muted`, `font-display`, `bg-accent`) and wired `useTheme()` for a toggle button (`Sun`/`Moon` from `lucide-react`, `aria-label` "Toggle dark mode"/"Toggle light mode"). Removed `bg-gradient-primary`/`shadow-secondary`/purple-glow classes. Deleted unused `Header.css` (confirmed no imports repo-wide).

## TDD evidence

- RED: `getByRole('button', {name: /toggle (dark|light) mode/i})` → not found (only "Toggle menu" existed).
- Interim: initial impl rendered the toggle twice (once in desktop `nav`, once in mobile-only wrapper) — both present in jsdom regardless of `md:hidden`, causing "multiple elements" failure. Fixed by rendering a single toggle button shared across breakpoints (nav links wrapped separately in `hidden md:flex`; only the hamburger keeps `md:hidden`).
- GREEN: `Header.test.tsx` passes; full suite (`ThemeProvider.test.tsx`, `App.test.tsx`, `Header.test.tsx`) — 3 suites, 4 tests, all passed.
- `npm run build` — compiled successfully.

## Commits

| SHA | Subject |
|-----|---------|
| `8a68ed6` | feat: restyle header with theme toggle |

Files: `src/components/Header.tsx` (modified), `src/components/Header.test.tsx` (new), `src/components/Header.css` (deleted).

## Concerns

- Theme-toggle button is single/shared (not duplicated per breakpoint) — a deliberate deviation from a literal "desktop nav + mobile bar" duplication to keep the DOM/test unambiguous; visually still positioned before the hamburger on both breakpoints.
- Scroll-state class uses `border-b border-line bg-bg/95 backdrop-blur` when scrolled, transparent border/bg at top, per brief.

**Report path:** `.superpowers/sdd/task-4-report.md`
