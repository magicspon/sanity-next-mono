import { q, type Selection, TypeFromSelection, InferType } from 'groqd'
import { metaFragment } from '../fragments/meta.fragment'
import { heroFragment } from '../fragments/hero.fragment'
import { contentBlockSelection } from '../fragments/block.fragment'
import { imageSelection } from '../fragments/image.fragment'
import { link, links } from '../fragments/link.fragment'

const images = {
  _type: q.literal('images'),
  layout: q.string(),
  images: q('images')
    .filter()
    .grab({
      _type: q.literal('image'),
      _key: q.string(),
      ...imageSelection,
    })
    .nullable(),
}

export type PortableImages = TypeFromSelection<typeof images>

const blocks = {
  _type: q.literal('blocks'),
  layout: q.string(),
  variant: q.string(),
  cards: q('cards')
    .filter()
    .grab$({
      links,
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
      // links,
    }),
} satisfies Selection

export type PortableBlocks = TypeFromSelection<typeof blocks>

const linksSelection = {
  _type: q.literal('links'),
  layout: q.string(),
  links: q('links').filter().select(link),
} satisfies Selection

export type PortableLinks = TypeFromSelection<typeof linksSelection>

const body = q('body')
  .filter()
  .select({
    "_type == 'Content'": contentBlockSelection,
    "_type == 'image'": {
      _type: q.literal('image'),
      ...imageSelection,
    },
    "_type == 'links'": linksSelection,
    "_type == 'blocks'": blocks,

    "_type == 'images'": images,
  })

export type Body = InferType<typeof body>

export const pageDocument = {
  title: q.string(),
  hero: heroFragment.nullable(),
  ...metaFragment,

  body,
} satisfies Selection

export type PageDocument = TypeFromSelection<typeof pageDocument>
