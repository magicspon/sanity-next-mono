import { ObjectDefinition, defineField } from 'sanity'

export const linkField = (arg: Partial<ObjectDefinition> = {}) =>
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
        name: 'text',
        title: 'Text',
        type: 'string',
        initialValue: 'Read more',
      }),
      defineField({
        name: 'url',
        title: 'External link',
        type: 'url',
        hidden: ({ parent, value }) =>
          !value && (!!parent?.href || !!parent?.custom),
      }),
      defineField({
        name: 'custom',
        title: 'Custom link',
        type: 'string',
        hidden: ({ parent, value }) =>
          !value && (!!parent?.href || !!parent?.url),
      }),
      defineField({
        name: 'href',
        title: 'Internal link',
        type: 'reference',
        to: [{ type: 'project' }],
        hidden: ({ parent, value }) =>
          !value && (!!parent?.url || !!parent?.custom),
      }),

      defineField({
        name: 'variant',
        title: 'Variant',
        type: 'string',
        initialValue: 'Read more',
        options: {
          list: ['default', 'outline', 'ghost'],
          layout: 'dropdown',
        },
      }),
    ],
    ...arg,
  })
