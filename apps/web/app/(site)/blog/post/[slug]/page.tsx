import * as React from 'react'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { draftMode } from 'next/headers'
import { Post, PostPreview, Props, getData } from '~pages/Post'
import { blogPostQuery } from 'cms/queries/pages/blog.query'

export default async function Index({ params }: Props) {
  const { data } = await getData({ params })

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={blogPostQuery.query}
      initialData={data}
      as={PostPreview}
      params={params}
    >
      <Post data={data} />
    </LiveQuery>
  )
}
