'use client'

import config from 'cms/sanity.config'
import { NextStudio } from 'next-sanity/studio'

export default function Studio() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore this is fine... honest
  return <NextStudio config={config} />
}
