import { q, type Selection, TypeFromSelection } from 'groqd'
import { imageSelection } from '../fragments/image.fragment'
import { link } from '../fragments/link.fragment'
import { metaFragment } from '../fragments/meta.fragment'

export const homeDocument = {
  title: q.string(),
  ...metaFragment,
} satisfies Selection

export type HomeDocument = TypeFromSelection<typeof homeDocument>
