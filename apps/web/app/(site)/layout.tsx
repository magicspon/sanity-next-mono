import { runQuery } from 'cms/lib/runner'
import { ConditionalPreviewProvider } from '~(sanity)/components/ConditionalPreviewProvider'
import { globalQuery } from 'cms/queries/pages/global.query'
import { Header } from '~components/Header'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { Providers } from './provider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await runQuery(globalQuery, {})
  const menu = getFirstOrNull(data.mainMenu)

  return (
    <Providers>
      <Header items={menu?.items} />
      <ConditionalPreviewProvider>
        <main>{children}</main>
      </ConditionalPreviewProvider>
    </Providers>
  )
}
