import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { HomePage, HomePagePreview, getData } from '~/pages/HomePage'

export default async function Index() {
  const { data, draftMode, query } = await getData()

  return (
    <LiveQuery
      enabled={draftMode}
      query={query}
      initialData={data}
      as={HomePagePreview}
    >
      <HomePage data={data} />
    </LiveQuery>
  )
}
