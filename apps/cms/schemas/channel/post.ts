import { defineType } from 'sanity'
import { titleField } from '../fields/core'
import { meta, openGraph } from '../fields/seo'
import { block } from '../fields/block'
import { cardField } from '../fields/card'

export const post = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  groups: [{ name: 'teaser' }, { name: 'post' }, { name: 'seo' }],
  fields: [
    titleField(),
    cardField({
      name: 'teaser',
      title: 'Teaser',
      group: 'teaser',
    }),
    block({ group: 'post' }),
    openGraph({ group: 'seo' }),
    meta({ group: 'seo' }),
  ],
})
