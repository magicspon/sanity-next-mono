import preset from 'tailwind-config'
import { Config } from 'tailwindcss'
import fontMetrics from '@capsizecss/metrics/roboto'

export default {
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/**/*.{ts,tsx}'],
  presets: [preset],
  theme: {
    capsize: {
      rootLineHeightUnitless: 1.2,
      fontMetrics: {
        sans: fontMetrics,
      },
      className: 'trim',
    },
    extend: {
      gridTemplateColumns: {
        site: `[full-start] var(--full)
               [feature-start] var(--feature)
               [popout-start] var(--popout)
               [content-start] var(--content) [content-end]
               var(--popout) [popout-end]
               var(--feature) [feature-end]
               var(--full) [full-end]`,
      },
    },
  },
} satisfies Config
