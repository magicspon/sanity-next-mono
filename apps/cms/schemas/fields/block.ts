import {
  ArrayDefinition,
  FieldDefinitionBase,
  defineArrayMember,
  defineField,
} from 'sanity'
import { image } from './image'
import { linkField } from './link'

export const block = (
  arg: Partial<ArrayDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'block',
    type: 'array',
    title: 'Block',
    validation: (rule) => rule.required(),
    of: [
      defineArrayMember({
        type: 'block',
        name: 'Content',
        marks: {
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                defineField({
                  name: 'url',
                  title: 'External link',
                  type: 'url',
                  hidden: ({ parent, value }) => !value && !!parent?.href,
                }),
                defineField({
                  name: 'href',
                  title: 'Internal link',
                  type: 'reference',
                  to: [{ type: 'project' } as const],
                  hidden: ({ parent, value }) => !value && !!parent?.url,
                }),
              ],
            },
          ],
        },
      }),
      defineArrayMember(image()),
      defineArrayMember(linkField()),
      defineArrayMember({
        name: 'linksGroup',
        type: 'object',
        title: 'Group of links',
        fields: [
          defineField({
            type: 'array',
            name: 'links',
            of: [defineArrayMember(linkField())],
          }),
        ],
        preview: {
          select: {
            links: 'links',
          },
          prepare({ links }) {
            const items = links as { text: string }[]
            return {
              title: 'Links',
              description: items.map((l) => l.text).join(', '),
            }
          },
        },
      }),
    ],
    ...arg,
  })

export const teaser = (
  arg: Partial<ArrayDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'teaser',
    type: 'array',
    title: 'Teaser',
    validation: (rule) => rule.required(),
    of: [
      defineArrayMember({
        type: 'block',
        name: 'Content',
        marks: {
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                defineField({
                  name: 'url',
                  title: 'External link',
                  type: 'url',
                  hidden: ({ parent, value }) =>
                    !value && (!!parent?.href || !!parent?.custom),
                }),
                defineField({
                  name: 'href',
                  title: 'Internal link',
                  type: 'reference',
                  to: [{ type: 'project' } as const],
                  hidden: ({ parent, value }) =>
                    !value && (!!parent?.url || !!parent?.custom),
                }),
                defineField({
                  name: 'custom',
                  title: 'Custom link',
                  type: 'string',
                  hidden: ({ parent, value }) =>
                    !value && (!!parent?.href || !!parent?.url),
                }),
              ],
            },
          ],
        },
      }),
    ],
    ...arg,
  })
