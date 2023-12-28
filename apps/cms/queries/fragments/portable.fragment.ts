import { InferType, TypeFromSelection, q, Selection } from 'groqd'
import { contentBlockSelection } from './block.fragment'
import { imageSelection } from './image.fragment'
import { link } from './link.fragment'

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

const linksSelection = {
  _type: q.literal('links'),
  layout: q.string(),
  indent: q.boolean().optional().default(false).nullable(),
  links: q('links').filter().select(link),
} satisfies Selection

export type PortableLinks = TypeFromSelection<typeof linksSelection>

export const richText = q('body').filter().select({
  "_type == 'Content'": contentBlockSelection,
  "_type == 'links'": linksSelection,
})

export type RichText = InferType<typeof richText>

const blocks = {
  _type: q.literal('blocks'),
  layout: q.string(),
  variant: q.string(),
  columns: q.number().default(4).nullable(),
  cards: q('cards')
    .filter()
    .grab$({
      _key: q.string(),
      title: q.string(),
      flip: q.boolean().optional().default(false),
      body: richText,
      image: q('image')
        .grab({
          _type: q.literal('image'),
          ...imageSelection,
        })
        .nullable(),
    }),
} satisfies Selection

const breakSelection = {
  _type: q.literal('break'),
  style: q('style'),
  size: q('size'),
  indent: q.boolean().optional().default(false).nullable(),
}

const youtubeSelection = {
  _type: q.literal('youtube'),
  url: q.string().url(),
}

export type PortableBlocks = TypeFromSelection<typeof blocks>

export const body = q('body').filter().select({
  "_type == 'Content'": contentBlockSelection,
  "_type == 'links'": linksSelection,
  "_type == 'blocks'": blocks,
  "_type == 'images'": images,
  "_type == 'break'": breakSelection,
  "_type == 'youtube'": youtubeSelection,
})

export type Body = InferType<typeof body>
