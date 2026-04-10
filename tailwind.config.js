/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
theme: {
    extend: {
      colors: {
        background: 'hsl(260 87% 3%)',
        foreground: 'hsl(40 6% 95%)',
        primary: {
          DEFAULT: 'hsl(262 83% 58%)',
          foreground: 'hsl(0 0% 100%)',
        },
        hero: {
          heading: 'hsl(40 10% 96%)',
          sub: 'hsl(40 6% 82%)',
        },
        border: 'hsl(240 4% 20%)',
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}