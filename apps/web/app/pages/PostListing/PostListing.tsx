import { BlogQuery } from 'cms/queries/pages/blog.query'
import * as React from 'react'

export interface TPostListingProps {
  data: BlogQuery
}

export function PostListing(props: TPostListingProps) {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}
