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

Remove glow/sparkle-centric keyframes that wonג€™t be used (or leave unused ג€” prefer delete to avoid temptation). Keep only if still referenced after redesign; otherwise delete `glow`, `sparkle`, `pulse-glow`, `particle-float`, `shimmer`, `gradient-primary`.

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

