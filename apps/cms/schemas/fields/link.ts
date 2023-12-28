import { PageTreeField } from '@q42/sanity-plugin-page-tree'
import {
  ObjectDefinition,
  FieldDefinitionBase,
  defineField,
  defineArrayMember,
} from 'sanity'
import { pageTreeConfig } from '../../page-tree-config'
import { z } from 'zod'

const linkType = defineField({
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
})

export const richTextLink = defineField({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    linkType,
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type: string }
          if (parent?.type !== 'external') return true
          return parent?.type === 'external' &&
            z.string().url().safeParse(value).success
            ? true
            : 'This field is required'
        }),
    }),
    defineField({
      name: 'custom',
      title: 'Url',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'custom',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type: string }
          if (parent?.type !== 'custom') return true
          return parent?.type === 'custom' &&
            z.string().safeParse(value).success
            ? true
            : 'This field is required'
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'email',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type: string }
          if (parent?.type !== 'email') return true
          return parent?.type === 'email' &&
            z.string().email().safeParse(value).success
            ? true
            : 'This field is required'
        }),
    }),
    defineField({
      name: 'href',
      title: 'Page',
      type: 'reference',
      to: pageTreeConfig.pageSchemaTypes.map((d) => ({ type: d })),
      hidden: ({ parent }) => parent?.type !== 'internal',
      components: {
        field: (props) => PageTreeField({ ...props, config: pageTreeConfig }),
      },
    }),
  ],
})

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
      linkType,
      defineField({
        name: 'text',
        title: 'Text',
        type: 'string',
        initialValue: 'Read more',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'url',
        title: 'Url',
        type: 'url',
        hidden: ({ parent }) => parent?.type !== 'external',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            const parent = context.parent as { type: string }
            if (parent?.type !== 'external') return true
            return parent?.type === 'external' &&
              z.string().url().safeParse(value).success
              ? true
              : 'This field is required'
          }),
      }),
      defineField({
        name: 'custom',
        title: 'Url',
        type: 'string',
        hidden: ({ parent }) => parent?.type !== 'custom',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            const parent = context.parent as { type: string }
            if (parent?.type !== 'custom') return true
            return parent?.type === 'custom' &&
              z.string().safeParse(value).success
              ? true
              : 'This field is required'
          }),
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
        hidden: ({ parent }) => parent?.type !== 'email',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            const parent = context.parent as { type: string }
            if (parent?.type !== 'email') return true
            return parent?.type === 'email' &&
              z.string().email().safeParse(value).success
              ? true
              : 'This field is required'
          }),
      }),
      defineField({
        name: 'href',
        title: 'Page',
        type: 'reference',
        to: pageTreeConfig.pageSchemaTypes.map((d) => ({ type: d })),
        hidden: ({ parent }) => parent?.type !== 'internal',
        components: {
          field: (props) => PageTreeField({ ...props, config: pageTreeConfig }),
        },
        validation: (Rule) =>
          Rule.custom((value, context) => {
            const parent = context.parent as { type: string }
            if (parent?.type !== 'internal') return true
            return parent?.type === 'internal' && !!value
              ? true
              : 'This field is required'
          }),
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
