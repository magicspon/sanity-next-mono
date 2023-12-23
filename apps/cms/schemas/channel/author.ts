import { defineType } from 'sanity'
import { plainText, titleField } from '../fields/core'
import { richText } from '../fields/block'
import { image } from '../fields/image'

export const author = defineType({
  name: 'author',
  type: 'document',
  title: 'Authors',
  groups: [{ name: 'seo' }],
  fields: [titleField(), plainText(), image(), richText()],
})
