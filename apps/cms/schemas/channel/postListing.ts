import { defineType } from 'sanity'
import { openGraph } from '../fields/seo'
import { heroField } from '../fields/hero'

export const postListing = defineType({
  name: 'postListing',
  type: 'document',
  title: 'Blog home',
  groups: [
    { name: 'hero', default: true },
    { name: 'teaser' },
    { name: 'seo' },
  ],
  fields: [heroField({ group: 'hero' }), openGraph({ group: 'seo' })],
  preview: {
    select: {
      title: 'hero.heading',
    },
    prepare: ({ title }) => {
      return {
        title,
      }
    },
  },
})
