'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setResolvedTheme } = useThemeStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      let resolvedTheme: 'light' | 'dark';

      if (theme === 'system') {
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      } else {
        resolvedTheme = theme;
      }

      setResolvedTheme(resolvedTheme);
      document.documentElement.setAttribute('data-theme', resolvedTheme);

      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);

    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme, setResolvedTheme]);

  return <>{children}</>;
}
