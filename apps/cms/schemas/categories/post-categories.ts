import { defineType } from 'sanity'
import { plainText, titleField } from '../fields/core'
import { meta, openGraph } from '../fields/seo'

export const postCategory = defineType({
  name: 'postCategory',
  type: 'document',
  title: 'Categories',
  groups: [{ name: 'seo' }],
  fields: [
    titleField(),
    plainText(),
    openGraph({ group: 'seo' }),
    meta({ group: 'seo' }),
  ],
})
