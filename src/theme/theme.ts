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
