import { homeQuery } from 'cms/queries/pages/home.query'
import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { draftMode } from 'next/headers'
import { HomePage, HomePagePreview, getData } from '~pages/HomePage'

export default async function Index() {
  const { data } = await getData()

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={homeQuery.query}
      initialData={data}
      as={HomePagePreview}
    >
      <HomePage data={data} />
    </LiveQuery>
  )
}
