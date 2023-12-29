import { notFound } from 'next/navigation'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { Hero } from '~components/Hero'
import { Block } from '~components/portable/Block'
import { Debug } from '~utils/Debug'
import { ListingProps, PageOrListing, PageProps } from './data'

function PageTemplate({ data }: Pick<PageProps, 'data'>) {
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

function ListingTemplate({ data }: Pick<ListingProps, 'data'>) {
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

export function Page({ data, type }: PageOrListing) {
  if (type === 'page') {
    return <PageTemplate data={data} />
  }

  return <ListingTemplate data={data} />
}
