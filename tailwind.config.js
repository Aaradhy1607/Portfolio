/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#02040a',
          900: '#050b14',
          800: '#0a1526',
          700: '#0f2342',
        },
        cyber: {
          cyan: '#00f0ff',
          neon: '#00ffff',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Rajdhani', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 240, 255, 0.4)',
        'blue-glow': '0 0 25px rgba(59, 130, 246, 0.4)',
        'amber-glow': '0 0 25px rgba(245, 158, 11, 0.4)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'scan': 'scan 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
