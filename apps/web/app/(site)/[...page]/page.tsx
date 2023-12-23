import { runQuery } from 'cms/lib/runner'
import { pageQuery } from 'cms/queries/pages/page.query'
import * as React from 'react'
import { getPageMetaData } from 'cms/queries/tree'
import { notFound } from 'next/navigation'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { Block } from '~components/Block'

type Props = {
  params: {
    page: string[]
  }
}

async function getData({ params }: Props) {
  const pageMeta = await getPageMetaData(`/${params.page.join('/')}`)
  if (!pageMeta) notFound()
  const { _id, type } = pageMeta

  const queries = {
    page: pageQuery,
    product: pageQuery, // change
  }

  const args = {
    page: { id: _id },
    product: { id: _id },
  }

  const query = queries[type]
  const arg = args[type]
  const data = await runQuery(query, arg, { next: { tags: [type] } })
  const page = getFirstOrNull(data.page)

  return { page, type }
}

export default async function Home({ params }: Props) {
  const { page, type } = await getData({ params })

  if (type === 'page') {
    return <>{page?.body && <Block block={page.body} />}</>
  }

  return (
    <>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </>
  )
}
