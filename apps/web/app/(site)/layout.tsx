import { ConditionalPreviewProvider } from '~(sanity)/components/ConditionalPreviewProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConditionalPreviewProvider>{children}</ConditionalPreviewProvider>
}
