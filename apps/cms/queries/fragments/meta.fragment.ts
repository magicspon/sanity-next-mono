import { q, type Selection } from 'groqd'
import { metaImageSelection } from './image.fragment'

export const metaFragment = {
  og: q('og')
    .grab$({
      ogTitle: q.string(),
      image: q('image')
        .grab({
          _type: q.literal('image'),

          ...metaImageSelection,
        })
        .nullable(),
    })
    .nullable(),
  meta: q('meta')
    .grab$({
      title: q.string(),
      description: q.string(),
    })
    .nullable(),
} satisfies Selection
