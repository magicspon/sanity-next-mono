import { defineType } from 'sanity'
import { titleField } from '../fields/core'
import { openGraph } from '../fields/seo'
import { pageTreeConfig } from '../../page-tree-config'
import { definePageType } from '@q42/sanity-plugin-page-tree'
import { cardField } from '../fields/card'
import { block } from '../fields/block'
import { heroField } from '../fields/hero'

const _page = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  groups: [
    { name: 'meta', default: true },
    { name: 'teaser' },
    { name: 'page' },
    { name: 'seo' },
  ],
  fields: [
    titleField({ group: 'meta' }),
    cardField({
      name: 'teaser',
      title: 'Teaser',
      group: 'teaser',
      description: `This content is used when referenced by another entry`,
    }),
    heroField({ group: 'page' }),
    block({ group: 'page' }),
    openGraph({ group: 'seo' }),
  ],
})

export const page = definePageType(_page, pageTreeConfig, {
  isRoot: false,
  fieldsGroupName: 'meta',
})
