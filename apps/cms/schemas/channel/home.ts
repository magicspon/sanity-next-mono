import { defineType } from 'sanity'
import { titleField } from '../fields/core'
import { openGraph } from '../fields/seo'
import { pageTreeConfig } from '../../page-tree-config'
import { definePageType } from '@q42/sanity-plugin-page-tree'
import { heroField } from '../fields/hero'
import { block } from '../fields/block'

const _home = defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  groups: [{ name: 'hero' }, { name: 'page', default: true }, { name: 'seo' }],
  fields: [
    titleField({ group: 'page' }),
    heroField({ group: 'hero' }),
    block({ group: 'page' }),
    openGraph({ group: 'seo' }),
  ],
})

export const home = definePageType(_home, pageTreeConfig, {
  isRoot: true,
})
