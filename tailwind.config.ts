import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        blue: {
          DEFAULT: '#0066ff',
          50:  '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        cyan: {
          DEFAULT: '#00e5ff',
          50:  '#e6fbff',
          100: '#b3f4ff',
          200: '#80ecff',
          300: '#4de5ff',
          400: '#1addff',
          500: '#00e5ff',
          600: '#00b8cc',
          700: '#008a99',
          800: '#005c66',
          900: '#002e33',
        },
        neon: {
          green: '#00ff88',
          orange: '#ff4500',
          purple: '#c084fc',
          pink: '#ff3366',
          gold: '#ffd700',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
          hover: 'rgba(255,255,255,0.08)',
        },
        surface: {
          DEFAULT: '#080810',
          50: '#0a0a14',
          100: '#0d0d1f',
          200: '#10102a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        xs:   ['12px', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        sm:   ['14px', { lineHeight: '1.6' }],
        base: ['16px', { lineHeight: '1.7' }],
        lg:   ['18px', { lineHeight: '1.6' }],
        xl:   ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['36px', { lineHeight: '1.2' }],
        '5xl': ['48px', { lineHeight: '1.1' }],
        '6xl': ['60px', { lineHeight: '1.0' }],
        '7xl': ['72px', { lineHeight: '0.95' }],
        '8xl': ['96px', { lineHeight: '0.9' }],
        '9xl': ['128px', { lineHeight: '0.85' }],
      },
      backgroundImage: {
        'gradient-blue-cyan': 'linear-gradient(135deg, #0066ff, #00e5ff)',
        'gradient-hero': 'linear-gradient(180deg, rgba(0,102,255,0.1) 0%, transparent 100%)',
        'gradient-dark': 'linear-gradient(180deg, #000 0%, #04040f 50%, #000 100%)',
        'gradient-glow-blue': 'radial-gradient(circle, rgba(0,102,255,0.3) 0%, transparent 70%)',
        'gradient-glow-cyan': 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(0, 102, 255, 0.4)',
        'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.3)',
        'glow-sm-blue': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-sm-cyan': '0 0 20px rgba(0, 229, 255, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,229,255,0.1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'scan': 'scan 4s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-right': 'slideOutRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(500%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'snap': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
