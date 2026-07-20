### Task 1: Theme resolve helpers + ThemeProvider

**Files:**
- Create: `src/theme/theme.ts`
- Create: `src/theme/ThemeProvider.tsx`
- Create: `src/theme/ThemeProvider.test.tsx`
- Modify: `src/index.tsx`

**Interfaces:**
- Consumes: `window.matchMedia`, `localStorage`
- Produces:
  - `export type Theme = 'light' | 'dark'`
  - `export const THEME_STORAGE_KEY = 'am-portfolio-theme'`
  - `export function getSystemTheme(): Theme`
  - `export function readStoredTheme(): Theme | null`
  - `export function resolveInitialTheme(): Theme`
  - `export function applyThemeToDocument(theme: Theme): void`
  - `ThemeProvider` with context `{ theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void }`
  - `export function useTheme(): { theme: Theme; toggleTheme: () => void; setTheme: (t: Theme) => void }`

- [ ] **Step 1: Write failing tests**

```tsx
// src/theme/ThemeProvider.test.tsx
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { THEME_STORAGE_KEY, resolveInitialTheme, applyThemeToDocument } from './theme';

function Probe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      {theme}
    </button>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

test('resolveInitialTheme uses system when nothing stored', () => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes('dark'),
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  expect(resolveInitialTheme()).toBe('dark');
});

test('toggleTheme flips theme and persists', async () => {
  localStorage.setItem(THEME_STORAGE_KEY, 'light');
  applyThemeToDocument('light');
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );
  expect(screen.getByRole('button')).toHaveTextContent('light');
  await user.click(screen.getByRole('button'));
  expect(screen.getByRole('button')).toHaveTextContent('dark');
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});
```

- [ ] **Step 2: Run tests ג€” expect FAIL**

Run: `npm test -- --watchAll=false src/theme/ThemeProvider.test.tsx`  
Expected: FAIL (module not found / export missing)

- [ ] **Step 3: Implement theme helpers + provider**

```ts
// src/theme/theme.ts
export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'am-portfolio-theme';

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function readStoredTheme(): Theme | null {
  const value = localStorage.getItem(THEME_STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

export function resolveInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme();
}

export function applyThemeToDocument(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}
```

```tsx
// src/theme/ThemeProvider.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Theme,
  applyThemeToDocument,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
} from './theme';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => resolveInitialTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

Wrap in `src/index.tsx`:

```tsx
import { ThemeProvider } from './theme/ThemeProvider';
// ...
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 4: Run tests ג€” expect PASS**

Run: `npm test -- --watchAll=false src/theme/ThemeProvider.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/theme src/index.tsx
git commit -m "feat: add theme provider with system and stored preference"
```

---

