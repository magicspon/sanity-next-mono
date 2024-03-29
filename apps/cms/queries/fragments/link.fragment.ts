import { q, InferType, Selection } from 'groqd'

const _slug = {
  slug: q.slug('slug'),
} satisfies Selection

const _link = {
  slug: _slug.slug,
  parent: q('parent')
    .deref()
    .select({
      "parent != 'null'": {
        slug: _slug.slug,
        parent: q('parent')
          .deref()
          .select({
            "parent != 'null'": {
              slug: _slug.slug,
              // parent: q('parent').deref().select({
              //   default: _slug,
              // }),
            },
            default: _slug,
          }),
      },
      default: _slug,
    }),
} satisfies Selection

export const richText = {
  "type == 'external'": {
    _key: q.string().nullable().optional(),
    _type: q.literal('link').nullable(),
    type: q.literal('external'),
    href: q('url'),
  } satisfies Selection,
  "type == 'custom'": {
    _key: q.string().nullable().optional(),
    _type: q.literal('link').nullable(),
    type: q.literal('custom'),
    href: q('custom'),
  } satisfies Selection,
  "type == 'internal'": {
    _key: q.string().nullable().optional(),
    _type: q.literal('link').nullable(),
    type: q.literal('internal'),
    href: q('href')
      .deref()
      .select({
        "parent != 'null'": _link,
        default: {
          slug: q.slug('slug'),
        },
      }),
    variant: q.string(),
  } satisfies Selection,
  "type == 'email'": {
    _key: q.string().nullable().optional(),
    _type: q.literal('link').nullable(),
    type: q.literal('email'),
    href: q('@').grabOne(
      'email',
      q.string().transform((s) => `mailto:${s}`),
    ),
  } satisfies Selection,
}

export const link = {
  "type == 'external'": {
    type: q.literal('external'),
    _type: q.literal('link').nullable(),
    _key: q.string().nullable().optional(),
    text: q.string(),
    href: q('url'),
    variant: q.string(),
  } satisfies Selection,
  "type == 'custom'": {
    type: q.literal('custom'),
    _type: q.literal('link').nullable(),
    _key: q.string().nullable().optional(),
    text: q.string(),
    href: q('custom'),
    variant: q.string(),
  } satisfies Selection,
  "type == 'internal'": {
    type: q.literal('internal'),
    _type: q.literal('link').nullable(),
    _key: q.string().nullable().optional(),
    text: q.string(),
    href: q('href')
      .deref()
      .select({
        "parent != 'null'": _link,
        default: {
          slug: q.slug('slug'),
        },
      }),
    variant: q.string(),
  } satisfies Selection,
  "type == 'email'": {
    type: q.literal('email'),
    _type: q.literal('link').nullable(),
    _key: q.string().nullable().optional(),
    text: q.string(),
    href: q('@').grabOne(
      'email',
      q.string().transform((s) => `mailto:${s}`),
    ),
    variant: q.string(),
  } satisfies Selection,
}

export const links = q('links').grab$({
  layout: q.string().optional().default('inline'),
  links: q('links').filter().select(link).nullable(),
})

export type LinkSchema = InferType<typeof links>
