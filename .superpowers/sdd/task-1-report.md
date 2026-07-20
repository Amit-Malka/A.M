# Task 1 Report: Theme resolve helpers + ThemeProvider

**Branch:** `redesign/editorial-craft`  
**Date:** 2026-07-20  
**Status:** DONE_WITH_CONCERNS

---

## Summary

Implemented theme resolution helpers (`theme.ts`), React context provider (`ThemeProvider.tsx`), unit tests, and wrapped `App` in `ThemeProvider` via `index.tsx`. TDD followed: failing tests first, then implementation, then green verification.

---

## TDD Evidence

### RED (Step 2)

**Command:**
```
$env:CI='true'; npm test -- --watchAll=false src/theme/ThemeProvider.test.tsx
```

**Result:** FAIL — module not found

```
FAIL src/theme/ThemeProvider.test.tsx
  ● Test suite failed to run

    Cannot find module './ThemeProvider' from 'src/theme/ThemeProvider.test.tsx'

Test Suites: 1 failed, 1 total
Tests:       0 total
```

### Implementation (Step 3)

Created:
- `src/theme/theme.ts` — `Theme` type, `THEME_STORAGE_KEY`, `getSystemTheme`, `readStoredTheme`, `resolveInitialTheme`, `applyThemeToDocument`
- `src/theme/ThemeProvider.tsx` — `ThemeProvider`, `useTheme` with `{ theme, toggleTheme, setTheme }`
- Modified `src/index.tsx` — wrapped `<App />` in `<ThemeProvider>`

### Interim failure (user-event API)

After implementation, one test failed:

```
× toggleTheme flips theme and persists
  TypeError: _userEvent.default.setup is not a function
```

Root cause: verbatim test uses `userEvent.setup()` (API from `@testing-library/user-event` v14+); project had v13.5.0.

**Fix:** Upgraded `@testing-library/user-event` to `^14.5.2` in `package.json` / `package-lock.json`.

### GREEN (Step 4)

**Command:**
```
$env:CI='true'; npm test -- --watchAll=false src/theme/ThemeProvider.test.tsx
```

**Result:** PASS

```
PASS src/theme/ThemeProvider.test.tsx
  √ resolveInitialTheme uses system when nothing stored (3 ms)
  √ toggleTheme flips theme and persists (134 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

---

## Commit

| SHA | Subject |
|-----|---------|
| `9db01dc` | feat: add theme provider with system and stored preference |

**Files committed:**
- `src/theme/theme.ts` (new)
- `src/theme/ThemeProvider.tsx` (new)
- `src/theme/ThemeProvider.test.tsx` (new)
- `src/index.tsx` (modified)
- `package.json` (modified — user-event upgrade)
- `package-lock.json` (modified)

---

## Self-Review

### Matches brief

| Requirement | Status |
|-------------|--------|
| `Theme = 'light' \| 'dark'` | ✓ |
| `THEME_STORAGE_KEY = 'am-portfolio-theme'` | ✓ |
| `getSystemTheme()` | ✓ |
| `readStoredTheme()` | ✓ |
| `resolveInitialTheme()` | ✓ |
| `applyThemeToDocument()` sets `data-theme` on `<html>` | ✓ |
| `ThemeProvider` context: `theme`, `toggleTheme`, `setTheme` | ✓ |
| `useTheme()` throws outside provider | ✓ |
| Tests verbatim from brief | ✓ |
| `index.tsx` wraps App in ThemeProvider | ✓ |

### Behavior verified by tests

1. **System preference fallback:** When localStorage is empty, `resolveInitialTheme()` reads `matchMedia('(prefers-color-scheme: dark)')`.
2. **Toggle + persist:** Starting from stored `light`, toggle flips UI to `dark`, writes localStorage, and sets `document.documentElement[data-theme="dark"]`.

### Concerns

1. **Extra files in commit:** Brief listed only `src/theme` and `src/index.tsx` for commit; `package.json` / `package-lock.json` included because verbatim tests require `userEvent.setup()` (v14+).
2. **Unused import:** Test file imports `act` from RTL (verbatim from brief) but does not use it — harmless, may trigger lint in strict configs.
3. **Full suite not run:** Only task-scoped test file executed; existing `App.test.tsx` should remain unaffected.

### Out of scope (correctly skipped)

- No CSS token changes
- No UI section redesign
- No header theme toggle (later task)

---

## Handoff for downstream tasks

- Import `useTheme` from `./theme/ThemeProvider`
- Theme CSS should target `[data-theme="light"]` / `[data-theme="dark"]` on `document.documentElement`
- Storage key: `am-portfolio-theme`
