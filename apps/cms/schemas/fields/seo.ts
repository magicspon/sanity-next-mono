import { FieldDefinitionBase, ObjectDefinition, defineField } from 'sanity'

const OGTYPES = ['website', 'article', 'blog', 'video', 'image']

export const openGraph = (
  arg: Partial<ObjectDefinition & FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'og',
    title: 'Open graph',
    type: 'object',
    fields: [
      defineField({
        type: 'string',
        title: 'Page Title',
        name: 'title',
        description:
          'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        type: 'text',
        name: 'description',
        title: 'Describe This',
        rows: 2,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        type: 'image',
        title: 'Image',
        name: 'image',
        description:
          'URL of the image that should be used in social media previews. If you define this, you must define two other OG basic properties as well: title and type.',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        type: 'string',
        name: 'ogType',
        title: 'og:type',
        options: { list: OGTYPES },
        initialValue: OGTYPES[0],
      }),
    ],
    ...arg,
  })

export const meta = (
  arg: Partial<ObjectDefinition & FieldDefinitionBase> = {},
) =>
  defineField({
    type: 'object',
    name: 'meta',
    title: 'Meta',
    fields: [
      defineField({
        type: 'string',
        title: 'Title',
        name: 'title',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        type: 'text',
        name: 'description',
        title: 'Describe This',
        rows: 2,
        validation: (Rule) => Rule.required(),
      }),
    ],
    ...arg,
  })
