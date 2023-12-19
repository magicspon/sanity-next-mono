import { createClient } from 'next-sanity'
import { PROJECT_ID } from './env'

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-23',
  perspective: 'published',
  token: process.env.SANITY_STUDIO_WRITE_TOKEN,
})
export const SANITY_READ_TOKEN = process.env.SANITY_STUDIO_WRITE_TOKEN
