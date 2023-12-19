import { Providers } from './provider'
import { Header } from '~_components/global/Header'
import { Footer } from '~_components/global/Footer'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </Providers>
  )
}
