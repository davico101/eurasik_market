/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* warm gray */
        input: 'var(--color-input)', /* subtle cream */
        ring: 'var(--color-ring)', /* warm saddle brown */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* rich dark brown */
        primary: {
          DEFAULT: 'var(--color-primary)', /* warm saddle brown */
          foreground: 'var(--color-primary-foreground)', /* warm off-white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* complementary chocolate */
          foreground: 'var(--color-secondary-foreground)', /* warm off-white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* muted red */
          foreground: 'var(--color-destructive-foreground)', /* warm off-white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* subtle cream */
          foreground: 'var(--color-muted-foreground)', /* medium brown */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* energetic coral */
          foreground: 'var(--color-accent-foreground)', /* warm off-white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* warm off-white */
          foreground: 'var(--color-popover-foreground)', /* rich dark brown */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* subtle cream */
          foreground: 'var(--color-card-foreground)', /* rich dark brown */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* forest green */
          foreground: 'var(--color-success-foreground)', /* warm off-white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* goldenrod */
          foreground: 'var(--color-warning-foreground)', /* rich dark brown */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* muted red */
          foreground: 'var(--color-error-foreground)', /* warm off-white */
        },
      },
      fontFamily: {
        heading: ['proxima-nova', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        data: ['proxima-nova', 'monospace'],
      },
      borderRadius: {
        lg: '16px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        'warm': '0 4px 12px rgba(139, 69, 19, 0.15)',
        'warm-sm': '0 2px 6px rgba(139, 69, 19, 0.1)',
        'warm-lg': '0 8px 24px rgba(139, 69, 19, 0.2)',
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 1s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}