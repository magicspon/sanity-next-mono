import plugin from 'tailwindcss/plugin'

export const shadcnPlugin = plugin(
  ({ addBase }) => {
    // colours
    addBase({
      ':root': {
        '--max-width': '1200px',
        '--count': '4',
        '--gap': 'clamp(1rem, 1vw, 3rem)',
        '--full': 'minmax(var(--gap), 1fr)',
        '--popout': 'minmax(0, 1rem)',
        '--feature': 'minmax(0, 2rem)',
        '--columns':
          'repeat(var(--count), minmax(auto, calc(var(--max-width) / var(--count))))',
      },
    })

    const white = '0 0% 100%' // #fff
    const dark = '240 10% 3.9%' // #09090b
    const primary = '346.8 77.2% 49.8%'

    addBase({
      ':root': {
        '--background': white, // #fff
        '--foreground': dark, // #09090b
        '--card': white, // #fff
        '--card-foreground': dark, // #09090b
        '--popover': white, // #fff
        '--popover-foreground': dark, // #09090b
        '--primary': primary, // #e11d48
        '--primary-foreground': '355.7 100% 97.3%', // #fff1f2
        '--secondary': '240 4.8% 95.9%', // #f4f4f5
        '--secondary-foreground': '240 5.9% 10%', // #18181b
        '--muted': '240 4.8% 95.9%', // #f4f4f5
        '--muted-foreground': '240 3.8% 46.1%', // #71717a
        '--accent': '240 4.8% 95.9%', // #f4f4f5
        '--accent-foreground': '240 5.9% 10%', // #18181b
        '--destructive': '0 84.2% 60.2%', // #ef4444
        '--destructive-foreground': '0 0% 98%', // 0 0% 98%
        '--border': '240 5.9% 90%', // #e4e4e7
        '--input': '240 5.9% 90%', // #e4e4e7
        '--ring': primary, // #e11d48
        '--radius': 'rem',
      },
      '.purple': {
        '--background': '20 14.3% 4.1%',
        '--foreground': '0 0% 95%',
        '--card': '24 9.8% 10%',
        '--card-foreground': '0 0% 95%',
        '--popover': '0 0% 9%',
        '--popover-foreground': '0 0% 95%',
        '--primary': primary, // #e11d48
        '--primary-foreground': '355.7 100% 97.3%', // #fff1f2
        '--secondary': '240 3.7% 15.9%',
        '--secondary-foreground': '0 0% 98%',
        '--muted': '0 0% 15%',
        '--muted-foreground': '240 5% 64.9%',
        '--accent': '12 6.5% 15.1%',
        '--accent-foreground': '0 0% 98%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 85.7% 97.3%',
        '--border': '240 3.7% 15.9%',
        '--input': '240 3.7% 15.9%',
        '--ring': primary, // #e11d48
      },
    })
  },
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          border: {
            DEFAULT: 'hsl(var(--border))',
            dark: 'hsl(var(--border-dark))',
          },
          input: {
            DEFAULT: 'hsl(var(--input))',
            dark: 'hsl(var(--input-dark))',
          },
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',

          alt: {
            DEFAULT: 'hsl(var(--alt))',
            foreground: 'hsl(var(--alt-foreground))',
          },
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
  },
)
