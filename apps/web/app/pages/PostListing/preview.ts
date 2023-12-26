'use client'

import dynamic from 'next/dynamic'

export const PostListingPreview = dynamic(() =>
  import('./PostListing').then((m) => m.PostListing),
)
