import { ListingQuery, listingQuery } from 'cms/queries/pages/listing.query'
import { PageQuery, pageQuery } from 'cms/queries/pages/page.query'
import { getPageMetaData } from 'cms/queries/tree'
import { notFound } from 'next/navigation'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export type Props = {
  params: {
    page: string[]
  }
}

export type PageProps = {
  type: 'page'
  page: PageQuery['page'][number]
  _id: string
}
export type ListingProps = {
  type: 'listing'
  page: ListingQuery['page'][number]
  pages: ListingQuery['pages']
  _id: string
}

export async function getData({ params }: Props) {
  const [, runner] = createSanityFetcher()
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
      ? await runner(listingQuery, arg, { next: { tags: [type] } })
      : await runner(pageQuery, arg, { next: { tags: [type] } })
  const page = getFirstOrNull(data.page)

  if (type === 'listing') {
    return {
      type,
      page,
      pages: (data as ListingQuery).pages,
      _id,
    } as ListingProps
  }

  return { page, type, _id } as PageProps
}
