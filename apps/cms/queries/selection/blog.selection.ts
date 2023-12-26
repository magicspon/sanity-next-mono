import { q, type Selection, TypeFromSelection } from 'groqd'
import { metaFragment } from '../fragments/meta.fragment'
import { heroFragment } from '../fragments/hero.fragment'
import { teaser } from '../fragments/teaser.fragment'

export const category = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
} satisfies Selection

export const blogTeaserDocument = {
  title: q.string(),
  slug: q.slug('slug'),
  teaser: q('teaser').grab$(teaser),
  category: q('category')
    .deref()
    .grab$({
      title: q.string(),
      slug: q.slug('slug'),
    }),
} satisfies Selection

export type BlogTeaserDocument = TypeFromSelection<typeof blogTeaserDocument>

export const blogDocument = {
  title: q.string(),
  ...metaFragment,
} satisfies Selection

export type BlogDocument = TypeFromSelection<typeof blogDocument>

export const postListingDocument = {
  ...metaFragment,
  hero: heroFragment,
} satisfies Selection

export type PostListingDocument = TypeFromSelection<typeof postListingDocument>

export const categories = {
  ...category,
  description: q.string(),
  posts: q('*')
    .filter("_type == 'post' && references(^._id)")
    .slice(0, 5)
    .grab$(blogTeaserDocument),
  ...metaFragment,
} satisfies Selection
