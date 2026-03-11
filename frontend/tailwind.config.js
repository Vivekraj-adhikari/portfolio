/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#00ff88',
        dark: {
          900: '#080b0f',
          800: '#0d1117',
          700: '#161b22',
          600: '#1c2128',
        }
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
