import { useThemeStore } from '../store/theme';

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  
  const isDark = theme === 'dark';
  
  // Theme-aware color classes
  const colors = {
    bg: {
      primary: isDark ? 'bg-gray-900' : 'bg-white',
      secondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
      tertiary: isDark ? 'bg-gray-700' : 'bg-gray-100',
      card: isDark ? 'bg-gray-800' : 'bg-white',
    },
    text: {
      primary: isDark ? 'text-gray-100' : 'text-gray-900',
      secondary: isDark ? 'text-gray-300' : 'text-gray-700',
      muted: isDark ? 'text-gray-400' : 'text-gray-500',
      inverse: isDark ? 'text-gray-900' : 'text-gray-100',
    },
    border: {
      primary: isDark ? 'border-gray-700' : 'border-gray-200',
      secondary: isDark ? 'border-gray-600' : 'border-gray-300',
      light: isDark ? 'border-gray-600' : 'border-gray-100',
    },
    hover: {
      bg: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
      text: isDark ? 'hover:text-white' : 'hover:text-gray-900',
    }
  };
  
  // Common component styles
  const components = {
    card: `${colors.bg.card} ${colors.border.primary} border rounded-lg shadow-sm`,
    input: `${colors.bg.primary} ${colors.border.secondary} border rounded-md ${colors.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`,
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors',
      secondary: `${colors.border.secondary} border ${colors.text.secondary} ${colors.hover.bg} px-4 py-2 rounded-md text-sm font-medium transition-colors`,
    }
  };
  
  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    colors,
    components,
  };
};
