import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { draftMode } from 'next/headers'
import {
  PostCategory,
  PostCategoryPreview,
  Props,
  getData,
} from '~pages/PostCategory'
import { blogCategoryQuery } from 'cms/queries/pages/blog.query'

export default async function Index({ params }: Props) {
  const { data } = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={blogCategoryQuery.query}
      initialData={data}
      as={PostCategoryPreview}
      params={params}
    >
      <PostCategory data={data} />
    </LiveQuery>
  )
}
