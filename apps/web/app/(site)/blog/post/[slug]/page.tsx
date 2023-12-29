import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { Post, PostPreview, Props, getData } from '~pages/Post'

export default async function Index({ params }: Props) {
  const { data, query, draftMode } = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode}
      query={query}
      initialData={data}
      as={PostPreview}
      params={params}
    >
      <Post data={data} />
    </LiveQuery>
  )
}
