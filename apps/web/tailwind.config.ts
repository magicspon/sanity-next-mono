import preset from 'tailwind-config'
import type { Config } from 'tailwindcss'
// import plugin from 'tailwindcss/plugin'

export default {
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/**/*.{ts,tsx}'],
  presets: [preset],
} satisfies Config
