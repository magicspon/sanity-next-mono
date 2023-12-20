import { defineType } from 'sanity'
import { titleField } from '../fields/core'
import { meta, openGraph } from '../fields/seo'

export const settings = defineType({
  name: 'settings',
  type: 'document',
  title: 'Settings',
  groups: [{ name: 'seo' }],
  fields: [titleField(), openGraph({ group: 'seo' }), meta({ group: 'seo' })],
})
