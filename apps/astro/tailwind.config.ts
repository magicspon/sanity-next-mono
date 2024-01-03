import preset from 'tailwind-config'
import { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/**/*.{ts,tsx}'],
  presets: [preset],
  theme: {
    extend: {
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
