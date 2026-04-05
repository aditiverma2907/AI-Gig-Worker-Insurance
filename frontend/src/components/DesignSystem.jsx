import React from 'react';

/**
 * Card Component - Represents a "bolted module" on the industrial chassis
 * Includes manufacturing details (corner screws, vent slots)
 */
export const Card = ({ 
  children, 
  elevated = false, 
  screws = true, 
  vents = false,
  className = '' 
}) => {
  return (
    <div
      className={`
        relative
        bg-[#e0e5ec]
        rounded-lg
        p-8
        ${elevated ? 'shadow-neumorphic-floating' : 'shadow-neumorphic-card'}
        transition-all duration-300 hover:-translate-y-1
        ${className}
      `}
    >
      {/* Corner Screws (Manufacturing Details) */}
      {screws && (
        <>
          {/* Top-left screw */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-sm" />
          {/* Top-right screw */}
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-sm" />
          {/* Bottom-left screw */}
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-sm" />
          {/* Bottom-right screw */}
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-sm" />
        </>
      )}
      
      {/* Vent Slots (Top-right corner) */}
      {vents && (
        <div className="absolute top-4 right-4 flex gap-1">
          <div className="h-6 w-1 rounded-full bg-[#d1d9e6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
          <div className="h-6 w-1 rounded-full bg-[#d1d9e6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
          <div className="h-6 w-1 rounded-full bg-[#d1d9e6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
        </div>
      )}
      
      {children}
    </div>
  );
};

/**
 * Button Component - Physical 3D key with tactile interaction
 * States: Primary (accent), Secondary, Ghost
 */
export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = `
    font-sans font-bold uppercase tracking-widest
    transition-all duration-150
    active:translate-y-0.5
    focus-visible:outline-2 focus-visible:outline-[#ff4757] focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `
      bg-[#ff4757] text-white
      shadow-[4px_4px_8px_rgba(166,50,60,0.4),-4px_-4px_8px_rgba(255,100,110,0.4)]
      hover:brightness-110
      active:shadow-[inset_6px_6px_12px_#babecc,inset_-6px_-6px_12px_#ffffff]
      border border-white/20
    `,
    secondary: `
      bg-[#e0e5ec] text-[#2d3436]
      shadow-[var(--shadow-card)]
      hover:text-[#ff4757]
      active:shadow-[inset_6px_6px_12px_#babecc,inset_-6px_-6px_12px_#ffffff]
    `,
    ghost: `
      bg-transparent text-[#4a5568]
      hover:bg-[#d1d9e6]
      hover:shadow-[var(--shadow-recessed)]
      active:shadow-[inset_4px_4px_8px_#babecc,inset_-4px_-4px_8px_#ffffff]
    `
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-sm',
    md: 'px-6 py-3 text-sm rounded-md min-h-12',
    lg: 'px-8 py-4 text-base rounded-lg min-h-14'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Input Component - Recessed data slot with monospace font
 */
export const Input = ({
  placeholder,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <input
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full
        font-mono
        bg-[#e0e5ec]
        text-[#2d3436]
        placeholder:text-[#4a5568]/50
        rounded-md
        px-6 py-3
        min-h-14
        shadow-[var(--shadow-recessed)]
        border-none
        focus-visible:outline-none
        focus-visible:shadow-[var(--shadow-recessed),0_0_0_2px_#ff4757]
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

/**
 * LED Indicator - Status light with optional pulsing effect
 */
export const LedIndicator = ({
  status = 'online', // 'online' | 'offline' | 'alert' | 'warning'
  label,
  pulse = true,
  size = 'md', // 'sm' | 'md' | 'lg'
}) => {
  const statusColors = {
    online: '#22c55e',
    offline: '#9ca3af',
    alert: '#ff4757',
    warning: '#fbbf24',
  };

  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const glowMap = {
    online: 'shadow-[0_0_10px_2px_rgba(34,197,94,1)]',
    offline: 'shadow-none',
    alert: 'shadow-[0_0_10px_2px_rgba(255,71,87,0.6)]',
    warning: 'shadow-[0_0_10px_2px_rgba(251,191,36,0.6)]',
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`
          rounded-full
          ${sizeMap[size]}
          ${pulse && status !== 'offline' ? 'animate-pulse' : ''}
          ${glowMap[status]}
          transition-all
        `}
        style={{ backgroundColor: statusColors[status] }}
      />
      {label && <span className="font-mono text-xs font-medium uppercase text-[#4a5568]">{label}</span>}
    </div>
  );
};

/**
 * Badge Component - For labels and metadata
 */
export const Badge = ({
  children,
  variant = 'default', // 'default' | 'accent' | 'success' | 'alert'
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-[#d1d9e6] text-[#2d3436]',
    accent: 'bg-[#ff4757] text-white',
    success: 'bg-[#22c55e] text-white',
    alert: 'bg-[#ff4757] text-white',
  };

  return (
    <span
      className={`
        inline-block
        font-mono
        text-label-sm
        font-bold
        uppercase
        tracking-widest
        px-3 py-1
        rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

/**
 * Section Container - Standardized spacing and max-width
 */
export const Section = ({
  children,
  className = '',
  dark = false,
}) => {
  return (
    <section
      className={`
        py-24
        px-6 md:px-12
        ${dark ? 'bg-[#2d3436] text-white' : 'bg-[#e0e5ec]'}
        ${className}
      `}
    >
      <div className="max-w-prose mx-auto">
        {children}
      </div>
    </section>
  );
};

/**
 * Grid Layout - Responsive grid with consistent gap
 */
export const Grid = ({
  children,
  cols = 3, // Number of columns on desktop
  gap = 6, // Gap in units (24px per unit)
  responsive = true,
  className = '',
}) => {
  const colsMap = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div
      className={`
        grid
        grid-cols-1
        ${responsive ? colsMap[cols] : `grid-cols-${cols}`}
        gap-${gap}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * Hero Text - Large impactful typography with emboss effect
 */
export const HeroText = ({
  children,
  size = 'xl', // 'lg' | 'xl' | '2xl'
  glow = false,
  className = '',
}) => {
  const sizeMap = {
    lg: 'text-hero-5xl',
    xl: 'text-hero-6xl',
    '2xl': 'text-hero-7xl',
  };

  return (
    <h1
      className={`
        ${sizeMap[size]}
        font-extrabold
        tracking-tight
        text-[#2d3436]
        ${glow ? 'text-emboss-light' : ''}
        ${className}
      `}
    >
      {children}
    </h1>
  );
};

/**
 * Label - Technical metadata text in monospace
 */
export const Label = ({
  children,
  className = '',
}) => {
  return (
    <label className={`font-mono text-label-sm font-bold uppercase tracking-widest text-[#4a5568] ${className}`}>
      {children}
    </label>
  );
};

/**
 * Divider - Mechanical separator
 */
export const Divider = () => {
  return (
    <div className="h-1 w-full rounded-full bg-[#d1d9e6] shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
  );
};
