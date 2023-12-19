import { q, TypeFromSelection, type Selection } from 'groqd'

export const link = {
  _type: q.literal('link').optional(),
  _key: q.string().optional(),
  text: q.string().optional(),
  url: q.string().optional(),
  custom: q.string().optional(),
  variant: q.string().default('default'),
  href: q('href')
    .deref()
    .grab$({
      _type: q.string(),
      slug: q.slug('slug'),
    })
    .nullable(),
} satisfies Selection

export type LinkSchema = TypeFromSelection<typeof link>
