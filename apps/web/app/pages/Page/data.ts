import { ListingQuery, listingQuery } from 'cms/queries/pages/listing.query'
import { PageQuery, pageQuery } from 'cms/queries/pages/page.query'
import { getPageMetaData } from 'cms/queries/tree'
import { notFound } from 'next/navigation'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export type Props = {
  params: {
    page: string[]
  }
}

export type PageProps = {
  type: 'page'
  data: PageQuery
  id: string
  query: string
}
export type ListingProps = {
  type: 'listing'
  data: ListingQuery
  id: string
  query: string
}

export async function getData({ params }: Props) {
  const [, runner] = createSanityFetcher()
  const pageMeta = await getPageMetaData(`/${params.page.join('/')}`)
  if (!pageMeta) notFound()
  const { _id: id, type } = pageMeta

  const args = {
    page: { id },
    listing: { id },
  }

  const arg = args[type]
  const data =
    type === 'listing'
      ? await runner(listingQuery, arg, { next: { tags: [type] } })
      : await runner(pageQuery, arg, { next: { tags: [type] } })

  return {
    query: type === 'listing' ? listingQuery.query : pageQuery.query,
    data,
    id,
    type,
  } as PageProps | ListingProps
}
