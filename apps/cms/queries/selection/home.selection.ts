import { q, type Selection, TypeFromSelection } from 'groqd'
import { metaFragment } from '../fragments/meta.fragment'

export const homeDocument = {
  title: q.string(),
  ...metaFragment,
} satisfies Selection

export type HomeDocument = TypeFromSelection<typeof homeDocument>
