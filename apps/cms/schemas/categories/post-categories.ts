import { defineType } from 'sanity'
import { plainText, slugField, titleField } from '../fields/core'
import { openGraph } from '../fields/seo'

export const postCategory = defineType({
  name: 'postCategory',
  type: 'document',
  title: 'Categories',
  groups: [{ name: 'seo' }],
  fields: [titleField(), slugField(), plainText(), openGraph({ group: 'seo' })],
})
