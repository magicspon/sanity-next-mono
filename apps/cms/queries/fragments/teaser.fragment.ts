import { q, type Selection } from 'groqd'
import { contentBlockSelection } from './block.fragment'
import { imageSelection } from './image.fragment'
import { link } from './link.fragment'

export const teaser = {
  title: q.string(),
  body: q('body')
    .filter()
    .select({
      "_type == 'Content'": contentBlockSelection,
      "_type == 'links'": {
        _type: q.literal('links'),
        layout: q.string(),
        links: q('links').filter().select(link),
      },
    }),
  image: q('image')
    .grab({
      _type: q.literal('image'),
      ...imageSelection,
    })
    .nullable(),
} satisfies Selection
