import { defineConfig } from 'astro/config'
import { sanityIntegration } from '@sanity/astro'
import react from '@astrojs/react'
import { loadEnv } from 'vite'
import tailwindIntegration from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

const { SANITY_STUDIO_PROJECT_ID } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  '',
)

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanityIntegration({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: 'production',
      // Set useCdn to false if you're building statically.
      useCdn: false,
    }),
    react(),
    tailwindIntegration(),
  ],
  output: 'server',
  adapter: vercel(),
})
