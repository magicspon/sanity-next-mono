import { draftMode } from 'next/headers'
import { PreviewProvider } from '../PreviewProvider'

export function ConditionalPreviewProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return draftMode().isEnabled ? (
    <PreviewProvider token={process.env.SANITY_STUDIO_READ_TOKEN}>
      {children}
    </PreviewProvider>
  ) : (
    children
  )
}
