import { defineProject } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineProject({
  plugins: [react()],
  test: {
    clearMocks: true,
    globals: true,
    hookTimeout: 20000,
    environment: 'jsdom',
  },
})

//
