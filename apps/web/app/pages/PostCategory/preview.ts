'use client'

import dynamic from 'next/dynamic'

export const PostCategoryPreview = dynamic(() =>
  import('./PostCategory').then((m) => m.PostCategory),
)
