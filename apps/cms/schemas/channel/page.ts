import { defineType } from 'sanity'
import { titleField } from '../fields/core'
import { meta, openGraph } from '../fields/seo'
import { pageTreeConfig } from '../../page-tree-config'
import { definePageType } from '@q42/sanity-plugin-page-tree'

const _page = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  groups: [{ name: 'seo' }],
  fields: [titleField(), openGraph({ group: 'seo' }), meta({ group: 'seo' })],
})

export const page = definePageType(_page, pageTreeConfig, {
  isRoot: false,
})
