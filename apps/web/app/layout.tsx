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
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#180048" />
        <meta name="theme-color" content="#180048"></meta>
      </head>
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
