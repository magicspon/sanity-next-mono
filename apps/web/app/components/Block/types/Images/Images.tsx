import { PortableImages } from 'cms/queries/selection/page.selection'
import * as React from 'react'

export interface TImagesProps {}

export function Images({ layout, images }: PortableImages) {
  return <pre>{JSON.stringify({ layout, images }, null, 2)}</pre>
}
