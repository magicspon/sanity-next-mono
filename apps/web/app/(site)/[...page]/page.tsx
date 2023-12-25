import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { draftMode } from 'next/headers'
import { Page, PagePreview, getData, Props } from '~pages/Page'
import { pageQuery } from 'cms/queries/pages/page.query'

export default async function Index({ params }: Props) {
  const data = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pageQuery.query}
      initialData={data}
      as={PagePreview}
      params={{ id: data?._id }}
    >
      <Page data={data} />
    </LiveQuery>
  )
}
