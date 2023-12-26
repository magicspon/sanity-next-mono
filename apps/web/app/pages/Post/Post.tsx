import { BlogPostQuery } from 'cms/queries/pages/blog.query'
import * as React from 'react'

export interface TPostProps {
  data: BlogPostQuery
}

export function Post(props: TPostProps) {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}
