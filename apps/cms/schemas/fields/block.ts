import {
  ArrayDefinition,
  FieldDefinitionBase,
  defineArrayMember,
  defineField,
} from 'sanity'
import { image } from './image'
import { linkField, linksArrayField } from './link'
import { cardField } from './card'

export const block = (
  arg: Partial<ArrayDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'body',
    type: 'array',
    title: 'Block',
    validation: (rule) => rule.required(),
    of: [
      defineArrayMember({
        type: 'block',
        name: 'Content',
        marks: {
          annotations: [linkField()],
        },
      }),
      defineArrayMember({
        name: 'images',
        title: 'Image',
        type: 'object',
        groups: [{ name: 'image' }, { name: 'layout' }],
        fields: [
          defineField({
            group: 'image',
            name: 'images',
            title: 'Image(s)',
            type: 'array',
            of: [defineArrayMember(image())],
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            group: 'layout',
            type: 'string',
            name: 'layout',
            initialValue: 'stack',
            options: {
              list: [
                { value: 'grid', title: 'Grid' },
                { value: 'inline', title: 'Inline' },
                { value: 'stack', title: 'Stack' },
              ],
              layout: 'radio',
              direction: 'horizontal',
            },
            hidden: ({ parent }) => {
              return !(parent?.images?.length > 1)
            },
          }),
        ],
        preview: {
          select: {
            alt: 'images.0.alt',
            images: 'images.0.asset',
          },
          prepare: ({ alt, images }) => {
            console.log({ images })
            return {
              title: `Image(s): ${alt}`,
              media: images,
            }
          },
        },
      }),
      defineArrayMember(linksArrayField()),
      defineArrayMember({
        type: 'object',
        name: 'blocks',
        fields: [
          defineField({
            name: 'cards',
            type: 'array',
            of: [defineArrayMember(cardField())],
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

            hidden: ({ parent }) => {
              return !parent?.cards?.length
            },
          }),
          defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            initialValue: 'stack',
            options: {
              layout: 'radio',
              direction: 'horizontal',
              list: [
                { value: 'stack', title: 'stack' },
                { value: 'inline', title: 'inline' },
                { value: 'grid', title: 'grid' },
              ],
            },
            hidden: ({ parent }) => {
              return !parent?.cards?.length
            },
          }),
        ],
        preview: {
          select: {
            t1: 'cards.0.title',
            t2: 'cards.1.title',
            t3: 'cards.2.title',
            t4: 'cards.3.title',
            layout: 'layout',
            variant: 'variant',
          },
          prepare: ({ t1, t2, t3, t4, layout, variant }) => {
            const title = [t1, t2, t3, t4].filter(Boolean).join(', ')
            return {
              title: `Blocks: ${title}`,
              subtitle: `Layout: ${layout}, Variant: ${variant}`,
            }
          },
        },
      }),
      defineArrayMember({
        name: 'banner',
        title: 'Banner',
        type: 'reference',
        to: [{ type: 'banner' }],
      }),

      defineArrayMember({
        type: 'object',
        name: 'related',
        fields: [
          defineField({
            name: 'cards',
            type: 'array',
            of: [
              defineArrayMember({
                name: 'entry',
                type: 'reference',
                to: [{ type: 'page' }, { type: 'post' }],
              }),
            ],
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

            hidden: ({ parent }) => {
              return !parent?.cards?.length
            },
          }),
          defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            initialValue: 'stack',
            options: {
              layout: 'radio',
              direction: 'horizontal',
              list: [
                { value: 'stack', title: 'stack' },
                { value: 'inline', title: 'inline' },
                { value: 'grid', title: 'grid' },
              ],
            },
            hidden: ({ parent }) => {
              return !parent?.cards?.length
            },
          }),
        ],
        preview: {
          select: {
            t1: 'cards.0.title',
            t2: 'cards.1.title',
            t3: 'cards.2.title',
            t4: 'cards.3.title',
            layout: 'layout',
            variant: 'variant',
          },
          prepare: ({ t1, t2, t3, t4, layout, variant }) => {
            const title = [t1, t2, t3, t4].filter(Boolean).join(', ')
            return {
              title: `Blocks: ${title}`,
              subtitle: `Layout: ${layout}, Variant: ${variant}`,
            }
          },
        },
      }),
    ],
    ...arg,
  })

export const richText = (
  arg: Partial<ArrayDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'richText',
    type: 'array',
    title: 'Teaser',
    validation: (rule) => rule.required(),
    of: [
      defineArrayMember({
        type: 'block',
        name: 'Content',
        marks: {
          annotations: [linkField()],
        },
      }),
      linksArrayField(),
    ],
    ...arg,
  })
