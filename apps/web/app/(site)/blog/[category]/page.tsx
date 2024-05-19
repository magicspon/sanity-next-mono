import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import {
  PostCategory,
  PostCategoryPreview,
  Props,
  getData,
} from '~/pages/PostCategory'

export default async function Index({ params }: Props) {
  const { data, query, draftMode } = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode}
      query={query}
      initialData={data}
      as={PostCategoryPreview}
      params={params}
    >
      <PostCategory data={data} />
    </LiveQuery>
  )
}
