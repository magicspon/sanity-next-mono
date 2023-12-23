import { q, InferType } from 'groqd'

export const link = {
  "type == 'external'": {
    type: q.literal('external'),
    _type: q.literal('link'),
    _key: q.string().optional(),
    text: q.string(),
    href: q('url'),
    variant: q.string(),
  },
  "type == 'custom'": {
    type: q.literal('custom'),
    _type: q.literal('link'),
    _key: q.string().optional(),
    text: q.string(),
    href: q('custom'),
    variant: q.string(),
  },
  "type == 'internal'": {
    type: q.literal('internal'),
    _type: q.literal('link'),
    _key: q.string().optional(),
    text: q.string(),
    href: q('href')
      .deref()
      .select({
        "parent != 'null'": {
          slug: q.slug('slug'),
          parent: q('parent')
            .deref()
            .select({
              "parent != 'null'": {
                slug: q.slug('slug'),
                parent: q('parent')
                  .deref()
                  .select({
                    "parent != 'null'": {
                      slug: q.slug('slug'),
                    },
                    default: {
                      slug: q.slug('slug'),
                    },
                  }),
              },
              default: {
                slug: q.slug('slug'),
              },
            }),
        },
        default: {
          slug: q.slug('slug'),
        },
      }),
    variant: q.string(),
  },
  "type == 'email'": {
    type: q.literal('email'),
    _type: q.literal('link'),
    _key: q.string().optional(),
    text: q.string(),
    href: q('@').grabOne(
      'email',
      q.string().transform((s) => `mailto:${s}`),
    ),
    variant: q.string(),
  },
}

export const links = q('links').grab$({
  layout: q.string().optional().default('inline'),
  links: q('links').filter().select(link).nullable(),
})

export type LinkSchema = InferType<typeof links>
