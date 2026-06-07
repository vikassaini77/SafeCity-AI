/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fbff',
          100: '#ccf7ff',
          200: '#99efff',
          300: '#66e7ff',
          400: '#33dfff',
          500: '#00F2FF',
          600: '#00c4cc',
          700: '#009699',
          800: '#006866',
          900: '#003a33',
          950: '#001d1a',
        },
        secondary: {
          50: '#f0f2f8',
          100: '#e1e5f1',
          200: '#c3cbe3',
          300: '#a1add5',
          400: '#7d8fc7',
          500: '#5f71b9',
          600: '#4a5aa8',
          700: '#3d4690',
          800: '#353d75',
          900: '#0A0E1A',
          950: '#080C18',
        },
        background: '#080C18',
        surface: '#0d1220',
        'surface-light': '#131a2e',
        accent: {
          red: '#FF3B3B',
          green: '#00FF88',
          yellow: '#FFB800',
          orange: '#FF6B35',
        },
        severity: {
          low: '#00FF88',
          medium: '#FFB800',
          high: '#FF6B35',
          critical: '#FF3B3B',
        },
      },
      fontFamily: {
        heading: ['Rajdhani', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0, 242, 255, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'counter': 'counter 0.5s ease-out',
        'alert-pulse': 'alertPulse 1s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 242, 255, 0.5), 0 0 10px rgba(0, 242, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 242, 255, 0.8), 0 0 30px rgba(0, 242, 255, 0.5)' },
        },
        alertPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 242, 255, 0.5)',
        'glow-accent': '0 0 20px rgba(0, 255, 136, 0.5)',
        'glow-alert': '0 0 20px rgba(255, 59, 59, 0.5)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
