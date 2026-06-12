/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Composed in OKLCH (see DESIGN.md), expressed as hex so Tailwind
        // opacity modifiers (bg-deep/60 etc.) keep working.
        bg: '#121110',          // oklch(0.17 0.004 60) page background
        deep: '#0B0A09',        // oklch(0.12 0.003 60) nav overlay / footer
        surface: '#1C1916',     // oklch(0.22 0.008 60) cards, panels
        divider: '#2B2620',     // hairlines
        ink: '#EDE7DD',         // oklch(0.93 0.012 80) body text
        muted: '#A89F92',       // oklch(0.70 0.015 75) secondary text
        ember: '#C75A1E',       // oklch(0.58 0.15 45) the one accent, fills
        'ember-bright': '#F08A4D', // oklch(0.72 0.14 48) accent text/icons on dark
        tan: '#E8C795',         // oklch(0.85 0.06 85) hero flourish + stat numerals
      },
      fontFamily: {
        display: ['"Young Serif"', 'Georgia', 'serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['"Martian Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        wrap: '76rem',
      },
    },
  },
  plugins: [],
}
