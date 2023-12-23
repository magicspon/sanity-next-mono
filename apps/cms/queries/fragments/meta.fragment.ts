import { q, type Selection } from 'groqd'
import { metaImageSelection } from './image.fragment'

export const metaFragment = {
  og: q('og')
    .grab$({
      title: q.string(),
      description: q.string(),
      image: q('image')
        .grab({
          _type: q.literal('image'),
          ...metaImageSelection,
        })
        .nullable(),
    })
    .nullable(),
} satisfies Selection
