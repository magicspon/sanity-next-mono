import { defineField, defineType } from 'sanity'
import { plainText, titleField } from '../fields/core'
import { richText } from '../fields/block'

export const banner = defineType({
  name: 'banner',
  type: 'document',
  title: 'Banner',
  fields: [
    titleField(),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'default',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { value: 'default', title: 'default' },
          { value: 'secondary', title: 'secondary' },
          { value: 'outline', title: 'outline' },
          { value: 'ghost', title: 'ghost' },
        ],
      },
    }),
    plainText(),
    richText({
      validation: undefined,
    }),
  ],
})
