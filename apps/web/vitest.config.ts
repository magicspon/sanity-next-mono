import { defineProject } from 'vitest/config'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'

dotenv.config({
  path: resolve(__dirname, './.env.local'),
})

export default defineProject({
  plugins: [react()],
  test: {
    clearMocks: true,
    globals: true,
    hookTimeout: 20000,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
    },
  },
})

//
