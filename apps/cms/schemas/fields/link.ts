import { PageTreeField } from '@q42/sanity-plugin-page-tree'
import {
  ObjectDefinition,
  FieldDefinitionBase,
  defineField,
  defineArrayMember,
} from 'sanity'
import { pageTreeConfig } from '../../page-tree-config'

export const linkField = (
  arg: Partial<ObjectDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'link',
    type: 'object',
    title: 'Link',
    preview: {
      select: {
        text: 'text',
      },
      prepare({ text }) {
        return {
          title: text,
        }
      },
    },
    fields: [
      defineField({
        name: 'type',
        title: 'Type',
        type: 'string',
        initialValue: 'external',
        validation: (Rule) => Rule.required(),
        options: {
          layout: 'radio',
          direction: 'horizontal',
          list: [
            { value: 'external', title: 'external' },
            { value: 'internal', title: 'internal' },
            { value: 'email', title: 'email' },
            { value: 'custom', title: 'custom' },
          ],
        },
      }),
      defineField({
        name: 'text',
        title: 'Text',
        type: 'string',
        initialValue: 'Read more',
      }),
      defineField({
        name: 'url',
        title: 'Url',
        type: 'url',
        hidden: ({ parent, value }) => !value && parent.type !== 'external',
      }),
      defineField({
        name: 'custom',
        title: 'Url',
        type: 'string',
        hidden: ({ parent, value }) => !value && parent.type !== 'custom',
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
        hidden: ({ parent, value }) => !value && parent.type !== 'email',
      }),
      defineField({
        name: 'href',
        title: 'Page',
        type: 'reference',
        to: pageTreeConfig.pageSchemaTypes.map((d) => ({ type: d })),
        hidden: ({ parent, value }) => !value && parent.type !== 'internal',
        components: {
          field: (props) => PageTreeField({ ...props, config: pageTreeConfig }),
        },
      }),

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
    ],
    ...arg,
  })

export const linksArrayField = (
  arg: Partial<ObjectDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'links',
    type: 'object',
    title: 'Links',
    fields: [
      defineField({
        type: 'array',
        name: 'links',
        of: [defineArrayMember(linkField())],
      }),
      defineField({
        type: 'string',
        name: 'layout',
        initialValue: 'inline',
        options: {
          list: [
            { value: 'inline', title: 'Inline' },
            { value: 'stack', title: 'Stack' },
          ],
          layout: 'radio',
          direction: 'horizontal',
        },

        hidden: ({ parent }) => {
          return !(parent?.links?.length > 1)
        },
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
          subtitle: items?.map((l) => l.text).join(', '),
        }
      },
    },
    ...arg,
  })
