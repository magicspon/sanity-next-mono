import { draftMode } from 'next/headers'
import { PreviewProvider } from '../PreviewProvider'

export function ConditionalPreviewProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return draftMode().isEnabled ? (
    <PreviewProvider token={process.env.SANITY_STUDIO_READ_TOKEN}>
      <div className="sticky z-50 text-center p-1 top-0 left-0 w-full bg-primary text-primary-foreground">
        <a className="text-sm" href="/api/draft/disable">
          Exit preview
        </a>
      </div>
      {children}
    </PreviewProvider>
  ) : (
    children
  )
}
