### Task 5: Hero ג€” editorial composition

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

- Name ג€Amit Malkaג€, subtitle ג€AI Developer & Data Analystג€, description paragraph, Download CV, Learn More ג†’ `#about`, LinkedIn/GitHub URLs.

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

- [ ] **Step 3: Run** `npm test -- --watchAll=false` (at least Hero/App tests) ג€” PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git add -u src/components/Hero.css
git commit -m "feat: restyle hero with editorial photo and quiet motion"
```

---

