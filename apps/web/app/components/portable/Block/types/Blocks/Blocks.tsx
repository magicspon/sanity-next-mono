import { PortableBlocks } from 'cms/queries/fragments/portable.fragment'
import * as React from 'react'

export interface TBlocksProps {}

export function Blocks({ layout, variant, cards }: PortableBlocks) {
  return <pre>{JSON.stringify({ layout, variant, cards }, null, 2)}</pre>
}
