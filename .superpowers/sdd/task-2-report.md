# Task 2 Report: Design tokens, fonts, Tailwind mapping

**Branch:** `redesign/editorial-craft`
**Date:** 2026-07-20
**Status:** DONE

---

## Summary

Wired the Editorial Craft (Urban Chic + terracotta accent) design tokens as CSS custom properties, replaced Inter with Fraunces (display) + Source Sans 3 (body), mapped Tailwind `colors`/`fontFamily` to the tokens, updated `App.tsx` to the new token-based shell classes, and removed `DynamicBackground` usage. Added the optional pre-paint theme script since it was easy.

---

## Steps completed

| Step | File | Result |
|------|------|--------|
| 1. Fonts in `index.html` | `public/index.html` | Removed Inter preload/stylesheet links; added Fraunces + Source Sans 3 Google Fonts link with preconnects; updated `theme-color` meta to `#F2E9E4` |
| 2. Token CSS | `src/index.css` | Added exact `:root`/`[data-theme]` light+dark var blocks, `color-scheme`, `body` (bg/color/font-family via vars), reduced-motion media query — verbatim from brief. Kept pre-existing `code` font-family rule (unrelated, no reason to remove) |
| 3. Tailwind mapping | `tailwind.config.js` | Replaced `primary`/`secondary`/`accent`/`background-dark`/`background-light`/`inter` with `bg`, `surface`, `line` (→ `--border`), `ink`, `muted`, `accent` colors and `display`/`sans` fontFamily — verbatim from brief |
| 4. App shell | `src/App.tsx` | Removed `DynamicBackground` import + `<DynamicBackground />` usage; root div now `min-h-screen bg-bg text-ink font-sans overflow-x-hidden` |
| 5. Build | — | `npm run build` → Compiled successfully (twice, before/after optional step) |
| 6. Commit | — | Committed per brief message |
| Optional | `public/index.html` | Added tiny inline script (before body render) reading `localStorage['am-portfolio-theme']`, falling back to `prefers-color-scheme`, setting `data-theme` on `<html>` before paint — prevents theme flash. Mirrors `src/theme/theme.ts` logic from Task 1 (same storage key) |

---

## Decisions / deviations

1. **Kept animation keyframes in `tailwind.config.js`** (`glow`, `sparkle`, `pulse-glow`, `particle-float`, `shimmer`, `gradient-primary`, `float`, etc.) rather than deleting them. Brief said "keep only if still referenced after redesign; otherwise delete." Grep confirmed `animate-glow`, `animate-sparkle`, `animate-particle-float`, `animate-shimmer`, `animate-pulse-glow` classes are actively used across `Header`, `Hero`, `About`, `Skills`, `Experience`, `Contact`, `WorkWithMe`, `ProjectCard`, and several `.css` files — none of which are in scope for this task (explicitly "do not restyle sections yet"). Deleting the keyframes now would silently break their current visual animations before those sections are redesigned in later tasks. Left as a note for whichever task restyles those sections to delete the now-dead keyframes then.
2. **`DynamicBackground.tsx` file left in place** (unused, no longer imported) — brief only asked to remove usage from `App.tsx`, not delete the component file. Safe to delete in a later cleanup task.
3. Confirmed via grep that no other component used the old Tailwind classes (`bg-background-dark`, `font-inter`, `text-primary`, etc.) being removed, so the config replacement in step 3 has zero blast radius beyond `App.tsx`.
4. Split into two commits: the brief's Step 6 commit for tokens/fonts/Tailwind/App shell, and a second small commit for the optional pre-paint script (kept separate since it's explicitly optional/additive).

---

## Commits

| SHA | Subject |
|-----|---------|
| `5d70219` | feat: wire Urban Chic tokens, fonts, and Tailwind mapping |
| `f45ead4` | feat: set data-theme before paint to prevent theme flash |

---

## Build verification

```
npm run build
Compiled successfully.
```
Run twice (once after core steps, once after adding the optional inline script) — both green, no errors, only expected bundle-size deltas from removing Inter/font CSS.

---

## Self-review vs. brief

| Requirement | Status |
|-------------|--------|
| Fraunces + Source Sans 3 loaded, Inter removed | ✓ |
| Exact hex values for `--bg/--surface/--border/--text/--text-muted/--accent` (light + dark) | ✓ |
| `[data-theme]` switching on `html` | ✓ |
| `color-scheme: light dark` | ✓ |
| Reduced-motion media query | ✓ |
| Tailwind `colors`: `bg`, `surface`, `line`, `ink`, `muted`, `accent` | ✓ |
| Tailwind `fontFamily`: `display`, `sans` | ✓ |
| `App.tsx` uses `min-h-screen bg-bg text-ink font-sans`, `DynamicBackground` removed | ✓ |
| No Header/Hero/section restyling | ✓ (untouched) |
| Build compiles | ✓ |
| Optional pre-paint script | ✓ (implemented, easy) |

### Concerns

- None blocking. Sections still visually reference pre-redesign Tailwind classes (`animate-*`, and their own hardcoded colors in `.css` files) — expected until later tasks restyle them per the incremental plan.

---

## Handoff for downstream tasks

- Tailwind color utilities available: `bg-bg`, `bg-surface`, `border-line`, `text-ink`, `text-muted`, `text-accent`/`bg-accent`/`border-accent`, etc.
- Font utilities: `font-display` (Fraunces), `font-sans` (Source Sans 3, already the body default).
- `DynamicBackground.tsx` is dead code — safe to delete when convenient.
- Legacy `animate-glow`/`sparkle`/`particle-float`/`shimmer`/`pulse-glow`/`gradient-primary` keyframes remain in `tailwind.config.js` only because current (pre-restyle) sections still use them; remove once those sections adopt Editorial Craft styling.
