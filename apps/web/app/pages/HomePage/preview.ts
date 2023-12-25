'use client'

import dynamic from 'next/dynamic'

export const HomePagePreview = dynamic(() =>
  import('./HomePage').then((m) => m.HomePage),
)
