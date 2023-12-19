import type { Metadata } from 'next'
import Studio from './Studio'

export const metadata = {
  referrer: 'same-origin' as const,
  robots: 'noindex' as const,
  title: 'Admin - example',
} satisfies Metadata

export const dynamic = 'force-static'

export default function StudioPage() {
  return <Studio />
}
