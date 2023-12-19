'use client'

import config from 'cms/sanity.config'
import { NextStudio } from 'next-sanity/studio'

export default function Studio() {
  return <NextStudio config={config} />
}
