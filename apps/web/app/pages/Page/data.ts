import { ListingQuery, listingQuery } from 'cms/queries/pages/listing.query'
import { PageQuery, pageQuery } from 'cms/queries/pages/page.query'
import { getPageMetaData } from 'cms/queries/tree'
import { notFound } from 'next/navigation'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

export type Props = {
  params: {
    page: string[]
  }
}

type CoreProps = {
  id: string
  query: string
  draftMode: boolean
}

export type ListingProps = {
  type: 'listing'
  data: ListingQuery
}

export type PageProps = {
  type: 'page'
  data: PageQuery
}

export type PageOrListing = ListingProps | PageProps

export type PageDataProps = CoreProps & PageProps
export type ListingDataProps = CoreProps & ListingProps

export async function getData({ params }: Props) {
  const [draftMode, runner] = createSanityFetcher()
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
    draftMode,
  } as PageDataProps | ListingDataProps
}
