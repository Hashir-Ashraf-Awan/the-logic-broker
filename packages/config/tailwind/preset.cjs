/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2.5rem',
        lg: '3.5rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        'background-2': 'hsl(var(--background-2) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        accent: {
          blue: 'hsl(var(--accent-blue) / <alpha-value>)',
          purple: 'hsl(var(--accent-purple) / <alpha-value>)',
          cyan: 'hsl(var(--accent-cyan) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--accent-blue) / <alpha-value>)',
          foreground: 'hsl(var(--foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84% 60% / <alpha-value>)',
          foreground: 'hsl(0 0% 98% / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-satoshi)', 'var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-space-grotesk)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs: 'clamp(0.75rem, 0.74rem + 0.05vw, 0.8rem)',
        sm: 'clamp(0.875rem, 0.85rem + 0.1vw, 0.95rem)',
        base: 'clamp(1rem, 0.97rem + 0.15vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)',
        xl: 'clamp(1.375rem, 1.3rem + 0.3vw, 1.5rem)',
        '2xl': 'clamp(1.75rem, 1.6rem + 0.6vw, 2.25rem)',
        '3xl': 'clamp(2.25rem, 2rem + 1vw, 3rem)',
        '4xl': 'clamp(3rem, 2.5rem + 2vw, 4.5rem)',
        '5xl': 'clamp(3.75rem, 2.8rem + 4vw, 6.5rem)',
        display: 'clamp(4.5rem, 3rem + 6vw, 9rem)',
      },
      spacing: {
        section: 'clamp(5rem, 4rem + 4vw, 9rem)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      backgroundImage: {
        aurora:
          'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(262 83% 58%) 60%, hsl(188 94% 56%) 100%)',
        violet:
          'linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(188 94% 56%) 100%)',
        graphite:
          'linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 2%) 100%)',
        'radial-fade':
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(217 91% 60% / 0.18), transparent)',
        grid:
          'linear-gradient(to right, hsl(0 0% 100% / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        micro: '120ms',
        control: '220ms',
        panel: '420ms',
        reveal: '800ms',
        hero: '1400ms',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 hsl(217 91% 60% / 0.0)' },
          '50%': { boxShadow: '0 0 30px 4px hsl(217 91% 60% / 0.35)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 4s linear infinite',
        marquee: 'marquee 40s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up': 'accordion-up 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
