import { useThemeStore, applyTheme } from '../store/theme';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="flex items-center gap-3">
      {/* Light Mode Label */}
      <span className={`text-sm font-medium transition-colors duration-200 ${
        theme === 'light' 
          ? 'text-yellow-600 dark:text-yellow-400' 
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        Light
      </span>
      
      {/* Simple Working Button */}
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer ${
          theme === 'light' 
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200' 
            : 'bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200'
        }`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        type="button"
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </button>
      
      {/* Dark Mode Label */}
      <span className={`text-sm font-medium transition-colors duration-200 ${
        theme === 'dark' 
          ? 'text-blue-400 dark:text-blue-300' 
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        Dark
      </span>
    </div>
  );
}