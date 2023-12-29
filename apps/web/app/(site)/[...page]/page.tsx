import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { draftMode } from 'next/headers'
import { Page, PagePreview, getData, Props } from '~pages/Page'

export default async function Index({ params }: Props) {
  const resp = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={resp.query}
      initialData={resp.data}
      as={PagePreview}
      params={{ id: resp.id }}
    >
      <Page {...resp} />
    </LiveQuery>
  )
}
