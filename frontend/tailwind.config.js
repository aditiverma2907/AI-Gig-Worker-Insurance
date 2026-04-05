/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Industrial Skeuomorphism Color Palette
      colors: {
        // Primary palette - grey/industrial base
        chassis: '#e0e5ec',      // Level 0: Base surface
        panel: '#f0f2f5',        // Level +1: Slightly elevated
        muted: '#d1d9e6',        // Recessed/sunken areas
        
        // Text colors
        text: {
          primary: '#2d3436',    // Dark charcoal
          muted: '#4a5568',      // Slate grey (WCAG AA)
          light: '#ffffff',      // White on dark backgrounds
        },
        
        // Accent - Safety Orange (Braun Red)
        accent: '#ff4757',
        'accent-fg': '#ffffff',
        
        // Borders & shadows
        border: {
          shadow: '#babecc',     // Dark shadow color
          light: '#ffffff',      // Highlight color
          dark: '#a3b1c6',       // Deep shadow
        },
        
        // Dark theme (for technical panels)
        dark: {
          bg: '#2d3436',
          text: '#ffffff',
          accent: '#ff4757',
        }
      },
      
      // Typography Scale
      fontSize: {
        // Hero headings
        'hero-7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'hero-6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'hero-5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        
        // Section headings
        'heading-4xl': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-3xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        
        // Body text
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        
        // Labels & metadata (monospace-friendly)
        'label-sm': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      
      fontFamily: {
        // Inter: humanist sans-serif for headings & body
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        
        // JetBrains Mono: technical/monospace for data
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      fontWeight: {
        // Explicit weights for clarity
        thin: '100',
        hairline: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      
      // Border Radius Scale
      borderRadius: {
        'sm': '4px',       // Tight mechanical edges
        'md': '8px',       // Standard controls
        'lg': '16px',      // Large panels
        'xl': '24px',      // Hero components
        '2xl': '30px',     // Oversized containers
      },
      
      // Box Shadows - Neumorphic System (CRITICAL)
      boxShadow: {
        // Base dual-shadow neumorphic effects
        'neumorphic-card': '8px 8px 16px #babecc, -8px -8px 16px #ffffff',
        'neumorphic-floating': '12px 12px 24px #babecc, -12px -12px 24px #ffffff, inset 1px 1px 0 rgba(255,255,255,0.5)',
        'neumorphic-pressed': 'inset 6px 6px 12px #babecc, inset -6px -6px 12px #ffffff',
        'neumorphic-recessed': 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff',
        'neumorphic-sharp': '4px 4px 8px rgba(0,0,0,0.15), -1px -1px 1px rgba(255,255,255,0.8)',
        
        // LED glow (parameterized via CSS variables in components)
        'glow-red': '0 0 10px 2px rgba(255, 71, 87, 0.6)',
        'glow-green': '0 0 10px 2px rgba(34, 197, 94, 1)',
        
        // Button shadows (red-tinted for accent color)
        'button-accent': '4px 4px 8px rgba(166, 50, 60, 0.4), -4px -4px 8px rgba(255, 100, 110, 0.4)',
      },
      
      // Transitions & Animations
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      
      transitionTimingFunction: {
        // Mechanical spring easing
        'bounce-mechanical': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      
      animation: {
        // LED breathing pulse
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Mechanical spin (for loading indicators)
        spin: 'spin 1s linear infinite',
      },
      
      // Spacing - Consistent 4px grid
      spacing: {
        // Uses default Tailwind scale
        // Custom additions:
        '128': '32rem',
        '144': '36rem',
      },
      
      // Max-width for containers
      maxWidth: {
        'prose': '72rem', // 1152px - Primary content container
      },
      
      // Z-index scale
      zIndex: {
        'base': '0',
        'dropdown': '100',
        'sticky': '500',
        'fixed': '1000',
        'modal': '9999',
      },
      
      // Backdrop blur for glass effect
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      
      // Transform shortcuts
      translate: {
        'shallow': '2px',  // Button press depth
        'medium': '4px',
        'deep': '8px',
      },
      
      // Opacity scales
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
      },
    },
  },
  
  plugins: [
    // Custom plugin for aspect ratio helpers
    require('tailwindcss/plugin')(function({ addUtilities }) {
      addUtilities({
        '.aspect-device': {
          aspectRatio: '9 / 16',
        },
        '.aspect-video-wide': {
          aspectRatio: '21 / 9',
        },
      })
    }),
  ],
}
