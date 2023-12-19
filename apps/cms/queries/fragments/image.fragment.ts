import { q, type Selection, TypeFromSelection } from 'groqd'

export const imageSelection = {
  crop: q
    .object({
      top: q.number(),
      right: q.number(),
      bottom: q.number(),
      left: q.number(),
    })
    .nullable(),
  hotspot: q
    .object({
      x: q.number(),
      y: q.number(),
      width: q.number(),
      height: q.number(),
    })
    .nullable(),
  asset: q('asset')
    .deref()
    .grab({
      width: ['metadata.dimensions.width', q.number()],
      height: ['metadata.dimensions.height', q.number()],
      aspectRatio: ['metadata.dimensions.aspectRatio', q.number()],
      lqip: ['metadata.lqip', q.string()],
      url: q.string(),
    }),
  // Custom fields that I added to my schema
  alt: q.string().nullable(),
  caption: q.string().nullable(),
  alignment: q.string().nullable(),
} satisfies Selection

export type ImageSelection = TypeFromSelection<typeof imageSelection>

export const metaImageSelection = {
  asset: q('asset').deref().grab({
    // width: ['metadata.dimensions.width', q.number()],
    // height: ['metadata.dimensions.height', q.number()],
    // aspectRatio: ['metadata.dimensions.aspectRatio', q.number()],
    // lqip: ['metadata.lqip', q.string()],
    url: q.string().nullable(),
  }),
  // Custom fields that I added to my schema
  alt: q.string().nullable(),
} satisfies Selection
