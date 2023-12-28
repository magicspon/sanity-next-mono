import { HomeQuery } from 'cms/queries/pages/home.query'
import { notFound } from 'next/navigation'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { Block } from '~components/portable/Block'

export function HomePage({ data }: { data: HomeQuery }) {
  const page = getFirstOrNull(data.page)

  if (!page) notFound()

  return <Block variant="primary" block={page.body} />
}
