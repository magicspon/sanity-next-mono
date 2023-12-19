import { q, type Selection, TypeFromSelection } from 'groqd'

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
  markDefs: q('markDefs')
    .filter()
    .select({
      '_type == "link"': {
        _key: q.string(),
        _type: q.string(),
        url: q.string().nullable(),
        href: q('href')
          .deref()
          .grab$({
            _type: q.string(),
            slug: q.slug('slug'),
          })
          .nullable(),
      },
    })
    .nullable(),
  style: q.string().nullish(),
  listItem: q.string().nullish(),
  level: q.number().nullish(),
} satisfies Selection

export type PortableTextSelection = TypeFromSelection<
  typeof contentBlockSelection
>
