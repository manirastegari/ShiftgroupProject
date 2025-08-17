/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	darkMode: 'class', // Enable dark mode with class strategy
	theme: {
		extend: {
			colors: {
				// Custom color palette for better dark mode support
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
				},
			},
		},
	},
	plugins: [],
};
