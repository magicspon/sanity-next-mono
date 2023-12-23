import { q, type Selection, TypeFromSelection } from 'groqd'
import { metaFragment } from '../fragments/meta.fragment'
import { heroFragment } from '../fragments/hero.fragment'
import { contentBlockSelection } from '../fragments/block.fragment'
import { imageSelection } from '../fragments/image.fragment'
import { link } from '../fragments/link.fragment'

export const pageDocument = {
  title: q.string(),
  hero: heroFragment.nullable(),
  ...metaFragment,

  body: q('body')
    .filter()
    .select({
      "_type == 'Content'": contentBlockSelection,
      "_type == 'image'": {
        _type: q.literal('image'),
        ...imageSelection,
      },
      "_type == 'links'": {
        _type: q.literal('links'),
        layout: q.string(),
        links: q('links').filter().select(link),
      },
    }),
} satisfies Selection

export type PageDocument = TypeFromSelection<typeof pageDocument>
