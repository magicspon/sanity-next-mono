import { BlogCategoryQuery } from 'cms/queries/pages/blog.query'
import * as React from 'react'

export interface TPostCategoryProps {
  data: BlogCategoryQuery
}

export function PostCategory(props: TPostCategoryProps) {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}
