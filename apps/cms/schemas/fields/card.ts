import {
  ObjectDefinition,
  FieldDefinitionBase,
  defineField,
  FieldDefinition,
} from 'sanity'
import { image } from './image'
import { richText } from './block'
import { titleField } from './core'

export const cardField = (
  arg: Partial<ObjectDefinition> & Partial<FieldDefinitionBase> = {},
) => {
  const { fields = [], ...rest } = arg
  return defineField({
    name: 'card',
    type: 'object',
    groups: [{ name: 'content', default: true }, { name: 'image' }],
    fields: [
      titleField({ group: 'content' }),
      image({
        group: 'image',
        hidden: (doc) => {
          const key = doc.parent._key
          const cardParentBlock = (doc.document?.body as any[])?.find(
            (b) =>
              b._type === 'blocks' &&
              b?.cards?.some((c: any) => c._key === key),
          )
          console.log({ cardParentBlock })

          return false
        },
      }),
      richText({ name: 'body', title: 'Body', group: 'content' }),
      ...(fields as FieldDefinition[]),
    ],
    ...rest,
  })
}
