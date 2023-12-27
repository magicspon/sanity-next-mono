import { ImageDefinition, FieldDefinitionBase, defineField } from 'sanity'

export const image = (
  arg: Partial<ImageDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'image',
    type: 'image',
    title: 'Image',
    options: {
      hotspot: true,
    },
    fields: [
      // {
      //   name: 'caption',
      //   type: 'string',
      //   title: 'Caption',
      //   description: `Inline images only, will render as a caption below the image`,
      //   hidden: ({ parent, value }) => {
      //     return !parent?.asset
      //   },
      // },
      {
        name: 'alt',
        type: 'string',
        title: 'Attribution',
        validation: (Rule) => Rule.required(),
        hidden: ({ parent, value }) => {
          return !parent?.asset
        },
      },
    ],
    ...arg,
  })
