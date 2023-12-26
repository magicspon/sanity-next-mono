'use client'

import dynamic from 'next/dynamic'

export const PostPreview = dynamic(() => import('./Post').then((m) => m.Post))
