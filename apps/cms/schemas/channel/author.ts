import { defineType } from 'sanity'
import { plainText, slugField, titleField } from '../fields/core'
import { richText } from '../fields/block'
import { image } from '../fields/image'

export const author = defineType({
  name: 'author',
  type: 'document',
  title: 'Authors',
  groups: [{ name: 'seo' }],
  fields: [titleField(), slugField(), plainText(), image(), richText()],
})
