import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'ui/src/style/global.css'

const font = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
  },
  title: 'example',
  description: '',
  other: {
    'msapplication-TileColor': '#180048',
    'theme-color': '#180048',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          'flex flex-col min-h-screen bg-background text-foreground font-sans',
          font.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
