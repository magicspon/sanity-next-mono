import { q, type Selection, TypeFromSelection } from 'groqd'
import { link } from './link.fragment'

export const contentBlockSelection = {
  _type: q.string(),
  _key: q.string(),
  children: q.array(
    q.object({
      _key: q.string(),
      _type: q.string(),
      text: q.string(),
      marks: q.array(q.string()),
    }),
  ),
  markDefs: q('markDefs').filter('_type == "link"').select(link).nullable(),
  style: q.string().nullish(),
  listItem: q.string().nullish(),
  level: q.number().nullish(),
} satisfies Selection

export type PortableTextSelection = TypeFromSelection<
  typeof contentBlockSelection
>
