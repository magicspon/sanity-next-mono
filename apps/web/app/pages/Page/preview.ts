'use client'

import dynamic from 'next/dynamic'

export const PagePreview = dynamic(() => import('./Page').then((m) => m.Page))
