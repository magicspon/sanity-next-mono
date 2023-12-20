import { defineType } from 'sanity'
import { plainText, titleField } from '../fields/core'
import { meta, openGraph } from '../fields/seo'
import { pageTreeConfig } from '../../page-tree-config'
import { definePageType } from '@q42/sanity-plugin-page-tree'

const _product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  groups: [{ name: 'seo' }],
  fields: [
    titleField(),
    plainText(),
    openGraph({ group: 'seo' }),
    meta({ group: 'seo' }),
  ],
})

export const product = definePageType(_product, pageTreeConfig, {
  isRoot: false,
})
