export const metadata = {
  title: 'Carmel',
  description: 'Sanity.io powered cms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
