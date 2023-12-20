import { defineArrayMember, defineField, defineType } from 'sanity'
import { titleField } from '../fields/core'
import { image } from '../fields/image'
import { meta, openGraph } from '../fields/seo'
import { pageTreeConfig } from '../../page-tree-config'
import { definePageType } from '@q42/sanity-plugin-page-tree'

const _home = defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  groups: [{ name: 'seo' }],
  fields: [
    titleField(),
    defineField({
      name: 'images',
      type: 'array',
      of: [defineArrayMember(image())],
    }),
    openGraph({ group: 'seo' }),
    meta({ group: 'seo' }),
  ],
})

export const home = definePageType(_home, pageTreeConfig, {
  isRoot: true,
})
