import { runQuery } from 'cms/lib/runner'
import { PageQuery, pageQuery } from 'cms/queries/pages/page.query'
import { ListingQuery, listingQuery } from 'cms/queries/pages/listing.query'
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

type PageProps = { type: 'page'; page: PageQuery['page'][number] }
type ListingProps = {
  type: 'listing'
  page: ListingQuery['page'][number]
  pages: ListingQuery['pages']
}

async function getData({ params }: Props) {
  const pageMeta = await getPageMetaData(`/${params.page.join('/')}`)
  if (!pageMeta) notFound()
  const { _id, type } = pageMeta

  const args = {
    page: { id: _id },
    listing: { id: _id },
  }

  const arg = args[type]
  const data =
    type === 'listing'
      ? await runQuery(listingQuery, arg, { next: { tags: [type] } })
      : await runQuery(pageQuery, arg, { next: { tags: [type] } })
  const page = getFirstOrNull(data.page)

  if (type === 'listing') {
    return {
      type,
      page,
      pages: (data as ListingQuery).pages,
    } as ListingProps
  }

  return { page, type } as PageProps
}

export default async function Page({ params }: Props) {
  const data = await getData({ params })

  if (data.type === 'page') {
    const { page } = data
    return <>{page?.body && <Block block={page.body} />}</>
  }

  const { page, pages } = data

  return (
    <>
      <h1>Listing template</h1>
      <pre>{JSON.stringify(page, null, 2)}</pre>
      <pre>{JSON.stringify(pages, null, 2)}</pre>
    </>
  )
}
