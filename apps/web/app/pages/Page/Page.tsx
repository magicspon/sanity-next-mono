import { ListingQuery } from 'cms/queries/pages/listing.query'
import { PageQuery } from 'cms/queries/pages/page.query'
import { notFound } from 'next/navigation'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { Hero } from '~components/Hero'
import { Block } from '~components/portable/Block'
import { Debug } from '~utils/Debug'

type ListingProps = {
  type: 'listing'
  data: ListingQuery
}

type PageProps = {
  type: 'page'
  data: PageQuery
}

export function Page({ data, type }: ListingProps | PageProps) {
  if (type === 'page') {
    const entry = getFirstOrNull(data.page)
    if (!entry) {
      notFound()
    }
    return (
      <>
        {entry.hero && <Hero {...entry.hero} />}
        <Block variant="primary" block={entry.body} />
      </>
    )
  }

  const entry = getFirstOrNull(data.page)
  if (!entry) {
    notFound()
  }

  return (
    <>
      {entry.hero && <Hero {...entry.hero} />}
      <Debug render pages={data.pages} />
    </>
  )
}
