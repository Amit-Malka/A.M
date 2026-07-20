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
- Vertical timeline with `border-l border-line`; sticky date label on `lg:` if already structured that way ג€” restyle only.
- Remove purple gradient backgrounds.

- [ ] **Step 4: Visual smoke**

Run: `npm start` ג€” manually scan About/Skills/Experience light+dark (toggle).  
Or: `npm run build` for compile check.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/Skills.tsx src/components/Experience.tsx
git add -u src/components/*.css
git commit -m "feat: restyle about, skills, and experience in editorial tokens"
```

---

