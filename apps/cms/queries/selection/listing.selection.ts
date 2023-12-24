import { q, type Selection, TypeFromSelection } from 'groqd'
import { metaFragment } from '../fragments/meta.fragment'
import { heroFragment } from '../fragments/hero.fragment'
import { links, link } from '../fragments/link.fragment'
import { contentBlockSelection } from '../fragments/block.fragment'
import { imageSelection } from '../fragments/image.fragment'

export const listingDocument = {
  title: q.string(),
  hero: heroFragment.nullable(),
  ...metaFragment,
} satisfies Selection

export type ListingDocument = TypeFromSelection<typeof listingDocument>

export const listingTeaser = {
  title: q.string(),
  teaser: q('teaser').grab$({
    links: links.nullable(),
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
  }),
} satisfies Selection

export type ListingTeaser = TypeFromSelection<typeof listingTeaser>
