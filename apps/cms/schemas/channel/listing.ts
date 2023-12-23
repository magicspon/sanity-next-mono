import { defineType } from 'sanity'
import { titleField } from '../fields/core'
import { openGraph } from '../fields/seo'
import { pageTreeConfig } from '../../page-tree-config'
import { definePageType } from '@q42/sanity-plugin-page-tree'
import { cardField } from '../fields/card'
import { heroField } from '../fields/hero'

const _listing = defineType({
  name: 'listing',
  type: 'document',
  title: 'Listing',
  groups: [
    { name: 'meta', default: true },
    { name: 'hero' },
    { name: 'teaser' },
    { name: 'seo' },
  ],
  fields: [
    titleField({ group: 'meta' }),
    heroField({ group: 'hero' }),
    cardField({
      name: 'teaser',
      title: 'Teaser',
      group: 'teaser',
      description: `This content is used when referenced by another entry`,
    }),
    openGraph({ group: 'seo' }),
  ],
})

export const listing = definePageType(_listing, pageTreeConfig, {
  isRoot: false,
  fieldsGroupName: 'meta',
})
