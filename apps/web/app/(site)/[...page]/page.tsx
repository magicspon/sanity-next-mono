import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { Page, PagePreview, getData, Props } from '~/pages/Page'

export default async function Index({ params }: Props) {
  const { draftMode, id, ...resp } = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode}
      query={resp.query}
      initialData={resp.data}
      as={PagePreview}
      params={{ id }}
    >
      <Page {...resp} />
    </LiveQuery>
  )
}
