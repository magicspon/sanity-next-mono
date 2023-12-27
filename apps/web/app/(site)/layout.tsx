import { runQuery } from 'cms/lib/runner'
import { ConditionalPreviewProvider } from '~(sanity)/components/ConditionalPreviewProvider'
import { globalQuery } from 'cms/queries/pages/global.query'
import { Header } from '~components/Header'
import { getFirstOrNull } from 'utils/getFirstOrNull'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await runQuery(globalQuery, {})
  const menu = getFirstOrNull(data.mainMenu)

  return (
    <ConditionalPreviewProvider>
      <Header items={menu?.items} />
      <main>{children}</main>
    </ConditionalPreviewProvider>
  )
}
