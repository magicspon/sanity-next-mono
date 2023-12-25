import { draftMode } from 'next/headers'
import { runQuery, runDraftQuery } from 'cms/lib/runner'

export const token = process.env.SANITY_STUDIO_READ_TOKEN

export function createSanityFetcher() {
  const isDraftMode = draftMode().isEnabled
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }

  return [isDraftMode, isDraftMode ? runDraftQuery : runQuery] as const
}
