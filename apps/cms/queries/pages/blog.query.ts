import { InferType, q } from 'groqd'
import {
  postListingDocument,
  blogTeaserDocument,
  blogDocument,
  categories,
} from '../selection/blog.selection'

export const blogQuery = q('').grab({
  page: q('*')
    .filter("_type == 'postListing' && !(_id in path('drafts.**'))")
    .grab$(postListingDocument),
  pages: q('*')
    .filter("_type == 'post' && !(_id in path('drafts.**'))")
    .grab$(blogTeaserDocument),
})

export type BlogQuery = InferType<typeof blogQuery>

export const blogPostQuery = q('').grab({
  page: q('*')
    .filter(
      "_type == 'post' && slug.current == $slug && !(_id in path('drafts.**'))",
    )
    .grab$(blogDocument),
})

export type BlogPostQuery = InferType<typeof blogPostQuery>

export const blogCategoryQuery = q('').grab({
  categories: q('*')
    .filter("_type == 'postCategory' && slug.current == $category")
    .grab$(categories),
})

export type BlogCategoryQuery = InferType<typeof blogCategoryQuery>
