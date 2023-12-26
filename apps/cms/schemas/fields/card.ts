import { ObjectDefinition, FieldDefinitionBase, defineField } from 'sanity'
import { image } from './image'
import { richText } from './block'
import { titleField } from './core'

export const cardField = (
  arg: Partial<ObjectDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'card',
    type: 'object',
    groups: [
      { name: 'content', default: true },
      { name: 'image' },
      { name: 'links' },
    ],
    fields: [
      titleField({ group: 'content' }),
      image({ group: 'image' }),
      richText({ name: 'body', title: 'Body', group: 'content' }),
    ],
    ...arg,
  })
