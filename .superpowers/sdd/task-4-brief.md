### Task 4: Header ג€” editorial + theme toggle

**Files:**
- Modify: `src/components/Header.tsx`
- Delete unused: `src/components/Header.css` (if unused)
- Test: extend or add `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: `useTheme()` from Task 1
- Keeps: same `menuItems` ids (`hero`, `about`, `skills`, `experience`, `projects`, `work-with-me`, `contact`)

- [ ] **Step 1: Write test for theme toggle presence**

```tsx
// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '../theme/ThemeProvider';

test('renders theme toggle', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
  expect(screen.getByRole('button', { name: /toggle (dark|light) mode/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run ג€” expect FAIL** (no accessible name yet)

- [ ] **Step 3: Restyle Header**

Requirements while editing `Header.tsx`:

- Classes use `bg-bg/90`, `border-line`, `text-ink`, `text-muted`, `font-display` for wordmark ג€” **no** `bg-gradient-primary`, `shadow-secondary`, purple glow.
- Add theme toggle button: `aria-label={theme === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}` calling `toggleTheme()`.
- Icons: `Sun` / `Moon` from `lucide-react`.
- Scroll state: `border-b border-line bg-bg/95 backdrop-blur` when scrolled; transparent when at top.
- Mobile menu unchanged in behavior; restyle to tokens.

- [ ] **Step 4: Run Header test ג€” PASS**

Run: `npm test -- --watchAll=false src/components/Header.test.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx
git add -u src/components/Header.css
git commit -m "feat: restyle header with theme toggle"
```

---

