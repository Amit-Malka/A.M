### Task 8: Work With Me + Contact restyle

**Files:**
- Modify: `src/components/WorkWithMe.tsx`
- Modify: `src/components/Contact.tsx`

**Interfaces:**
- Contact keeps `fetch('https://formspree.io/f/mvgggrzo', ג€¦)` and same `formData` fields.
- Work With Me keeps three service blocks and bullet copy.

- [ ] **Step 1: WorkWithMe**

- Typography blocks separated by `border-t border-line`.
- Accent only on hover link or small label ג€” not card glow.
- Section id `work-with-me` unchanged.

- [ ] **Step 2: Contact**

- Split: info column + form; on mobile form first (`order`).
- Inputs: `bg-surface border border-line text-ink`.
- Submit button: `bg-accent`.
- Preserve success/error states and Formspree logic.

- [ ] **Step 3: Build**

Run: `npm run build` ג€” success

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkWithMe.tsx src/components/Contact.tsx
git add -u src/components/WorkWithMe.css src/components/Contact.css
git commit -m "feat: restyle work-with-me and contact for editorial theme"
```

---

