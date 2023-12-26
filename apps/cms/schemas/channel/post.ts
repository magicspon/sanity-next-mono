import { defineField, defineType } from 'sanity'
import { slugField, titleField } from '../fields/core'
import { openGraph } from '../fields/seo'
import { block } from '../fields/block'
import { cardField } from '../fields/card'

export const post = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  groups: [{ name: 'teaser' }, { name: 'post' }, { name: 'seo' }],
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'postCategory' }],
    }),
    cardField({
      name: 'teaser',
      title: 'Teaser',
      group: 'teaser',
    }),
    block({ group: 'post' }),
    openGraph({ group: 'seo' }),
  ],
})
