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
  // Type instantiation is excessively deep and possibly infinite
  // this one is potentially a prety deep query. But it's fine, ts can handle it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data = await runQuery(globalQuery, {}, { next: { tags: ['global'] } })
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
