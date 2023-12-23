import { ObjectDefinition, FieldDefinitionBase, defineField } from 'sanity'
import { image } from './image'
import { linksArrayField } from './link'
import { plainText, stringField } from './core'

export const heroField = (
  arg: Partial<ObjectDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'hero',
    type: 'object',
    groups: [
      { name: 'settings' },
      { name: 'content', default: true },
      { name: 'image' },
      { name: 'links' },
    ],
    fields: [
      defineField({
        type: 'string',
        name: 'variant',
        initialValue: 'inline',
        group: 'settings',
        options: {
          list: [
            { value: 'text', title: 'Text' },
            { value: 'image', title: 'Image' },
            { value: 'split', title: 'Split' },
          ],
          layout: 'radio',
          direction: 'horizontal',
        },
      }),
      stringField({
        name: 'heading',
        group: 'content',
        description: 'supports markdown',
      }),
      image({
        group: 'image',
        hidden: ({ parent }) => parent?.variant === 'text',
      }),
      plainText({
        group: 'content',
        name: 'text',
        title: 'Text',
        description: 'supports markdown',
      }),
      linksArrayField({ group: 'links' }),
    ],
    ...arg,
  })
