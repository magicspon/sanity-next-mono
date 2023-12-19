import { defineCliConfig } from 'sanity/cli'
import { PROJECT_ID } from './lib/env'

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: 'production',
  },
})
