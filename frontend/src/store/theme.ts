import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Helper function to apply theme to document
export const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  
  // Update CSS custom properties
  if (theme === 'dark') {
    root.style.setProperty('--color-primary', '#3b82f6');
    root.style.setProperty('--color-primary-hover', '#2563eb');
    root.style.setProperty('--color-bg-primary', '#111827');
    root.style.setProperty('--color-bg-secondary', '#1f2937');
    root.style.setProperty('--color-bg-tertiary', '#374151');
    root.style.setProperty('--color-text-primary', '#f9fafb');
    root.style.setProperty('--color-text-secondary', '#d1d5db');
    root.style.setProperty('--color-text-muted', '#9ca3af');
    root.style.setProperty('--color-border', '#374151');
    root.style.setProperty('--color-border-light', '#4b5563');
  } else {
    root.style.setProperty('--color-primary', '#3b82f6');
    root.style.setProperty('--color-primary-hover', '#2563eb');
    root.style.setProperty('--color-bg-primary', '#ffffff');
    root.style.setProperty('--color-bg-secondary', '#f9fafb');
    root.style.setProperty('--color-bg-tertiary', '#f3f4f6');
    root.style.setProperty('--color-text-primary', '#111827');
    root.style.setProperty('--color-text-secondary', '#374151');
    root.style.setProperty('--color-text-muted', '#6b7280');
    root.style.setProperty('--color-border', '#e5e7eb');
    root.style.setProperty('--color-border-light', '#f3f4f6');
  }
};
