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
| Editorial Craft direction / no AI glow | 2, 4ג€“8, 9 |
| Urban Chic + terracotta tokens | 2 |
| Light + dark + system + persist | 1, 4 |
| Fonts replace Inter | 2 |
| Section order + content | 4ג€“8 (preserve) |
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

- `Theme`, `THEME_STORAGE_KEY`, `useTheme`, `applyThemeToDocument`, `resolveInitialTheme` named consistently across Tasks 1ג€“4.
- Carousel uses `Project` from `projectData.ts` and `projectsData` unchanged.
