import { FieldDefinitionBase, ImageDefinition, defineField } from 'sanity'

export const image = (arg: Partial<ImageDefinition> = {}) =>
  defineField({
    name: 'image',
    type: 'image',
    title: 'Image',
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: 'caption',
        type: 'string',
        title: 'Caption',
        description: `Inline images only, will render as a caption below the image`,
      },
      {
        name: 'alt',
        type: 'string',
        title: 'Attribution',
        validation: (Rule) => Rule.required(),
      },
    ],
    ...arg,
  })
