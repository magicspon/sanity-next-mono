import preset from 'tailwind-config'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/**/*.{ts,tsx}'],
  presets: [preset],

  plugins: [
    // this is a bit silly <div className="grid stack-[12_._._24] />
    plugin(function ({ matchUtilities, theme, addComponents }) {
      addComponents({
        '[class*=stack]': {
          gap: 'var(--stack)',
        },
      }),
        matchUtilities({
          stack: (value) => {
            const values = value.split(' ')
            const spacing = theme('spacing')
            const breakpoints = Object.values(theme('screens')!)
            const items = values.reduce(
              (acc, v, i) => {
                const space = v.startsWith('--') ? `var(${v})` : spacing?.[v]
                if (!space) {
                  if (v !== '.') {
                    console.warn(`No ${v} spacing value found`)
                  }
                  return acc
                }
                if (i === 0) {
                  acc['--stack'] = space
                } else {
                  const mq = breakpoints[i - 1]
                  acc[`@media only screen and (min-width: ${mq})`] = {
                    '--stack': space,
                  }
                }

                return acc
              },
              {} as Record<string, string | Record<string, string>>,
            )

            return items
          },
        })
    }),
  ],

  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1' }],
        sm: ['0.875rem', { lineHeight: '1.25' }],
        base: ['1rem', { lineHeight: '1.25' }],
        lg: ['1.125rem', { lineHeight: '1.24' }],
        xl: ['1.25rem', { lineHeight: '1.25' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['2rem', { lineHeight: '1.15' }],
        '4xl': ['2.5rem', { lineHeight: '1' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.5rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      gridTemplateColumns: {
        site: `[full-start] var(--full)
                [feature-start] var(--feature)
                  [popout-start] var(--popout)
                    [content-start] 
                      var(--columns)
                    [content-end]
                  var(--popout) [popout-end]
                var(--feature) [feature-end]
                var(--full) [full-end]`,
      },
    },
  },
} satisfies Config
