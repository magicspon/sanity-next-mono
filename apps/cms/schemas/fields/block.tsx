import * as React from 'react'
import {
  ArrayDefinition,
  FieldDefinitionBase,
  defineArrayMember,
  defineField,
} from 'sanity'
import { image } from './image'
import { linksArrayField, richTextLink } from './link'
import { cardField } from './card'
import { urlBuilder } from '../../lib/image'
import { Stack } from '@sanity/ui'
import { SplitHorizontalIcon } from '@sanity/icons'
import { getYouTubeID } from 'utils/youtube-id'

const YouTubePreview = ({ url }: { url: string }) => {
  const id = getYouTubeID(url)
  const embedUrl = `https://www.youtube.com/embed/${id}`
  if (!id) {
    return <div>Missing YouTube URL</div>
  }
  return (
    <iframe
      title="YouTube Preview"
      width="560"
      height="315"
      src={embedUrl}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  )
}

const content = defineArrayMember({
  type: 'block',
  name: 'Content',

  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
    { title: 'H4', value: 'h4' },
    { title: 'Quote', value: 'blockquote' },
    {
      title: 'Large',
      value: 'large',
      component: ({ children }: { children: React.ReactNode }) => (
        <p style={{ fontSize: 22 }}>{children}</p>
      ),
    },
    {
      title: 'Large (Indent)',
      value: 'largeIndent',
      component: ({ children }: { children: React.ReactNode }) => (
        <p style={{ fontSize: 22, marginLeft: 60 }}>{children}</p>
      ),
    },
    {
      title: 'Indent',
      value: 'indent',
      component: ({ children }: { children: React.ReactNode }) => (
        <p style={{ marginLeft: 60 }}>{children}</p>
      ),
    },
    {
      title: 'Sub Heading',
      value: 'subHeading',
      component: ({ children }: { children: React.ReactNode }) => (
        <p
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {children}
        </p>
      ),
    },
  ],
  marks: {
    annotations: [
      richTextLink,
      defineField({
        name: 'rule',
        type: 'object',
        fields: [
          defineField({
            name: 'show',
            type: 'boolean',
          }),
        ],
      }),
    ],

    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Code', value: 'code' },
      { title: 'Underline', value: 'underline' },
      { title: 'Strike', value: 'strike-through' },
      {
        title: 'Highlight',
        value: 'highlight',
        icon: () => <span style={{ fontWeight: 'bold' }}>H</span>,
        component: ({ children }: { children: React.ReactNode }) => (
          <span style={{ backgroundColor: 'yellow' }}>{children}</span>
        ),
      },
      {
        title: 'Rule',
        value: 'rule',
        icon: SplitHorizontalIcon,
        // component: HighlightDecorator,
      },
    ],
  },
})

export const richText = (
  arg: Partial<ArrayDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'richText',
    type: 'array',
    title: 'Teaser',
    validation: (rule) => rule.required(),
    of: [content, linksArrayField()],
    ...arg,
  })

const imagesBlock = defineArrayMember({
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
      return {
        title: `Image(s): ${alt}`,
        media: images,
      }
    },
  },
  components: {
    preview: (props: any) => {
      const actions = props.actions as Record<string, any>
      const images = actions.props.value.images as {
        asset: { _ref: string }
      }[]

      const urls = images
        ?.filter((o) => o.asset)
        .map((o) => urlBuilder(o.asset).url())

      return (
        <Stack space={[2]} padding={2}>
          {props.renderDefault(props)}
          <Stack space={[1]}>
            {urls?.map((u) => <img key={u} src={u} alt="" />)}
          </Stack>
        </Stack>
      )
    },
  },
})

const cardsBlock = defineArrayMember({
  type: 'object',
  name: 'blocks',
  fields: [
    defineField({
      name: 'cards',
      type: 'array',
      of: [
        defineArrayMember(
          cardField({
            fields: [
              defineField({
                name: 'flip',
                title: 'Flip',
                type: 'boolean',
                initialValue: false,
                description:
                  'Flips the layout, only applies to stack and split layouts',
              }),
            ],
          }),
        ),
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
          { value: 'card', title: 'card' },
          { value: 'stack', title: 'stack' },
          { value: 'split', title: 'split' },
        ],
      },
      hidden: ({ parent }) => {
        return !parent?.cards?.length
      },
    }),
    defineField({
      name: 'columns',
      title: 'Layout',
      type: 'number',
      initialValue: 4,
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { value: 1, title: '1' },
          { value: 2, title: '2' },
          { value: 3, title: '3' },
          { value: 4, title: '4' },
          { value: 5, title: '5' },
          { value: 6, title: '6' },
        ],
      },
      hidden: ({ parent }) => {
        return parent?.layout !== 'card'
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
})

export const block = (
  arg: Partial<ArrayDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'body',
    type: 'array',
    title: 'Block',
    validation: (rule) => rule.required(),
    of: [
      content,
      imagesBlock,
      defineArrayMember(
        linksArrayField({
          fields: [
            defineField({
              name: 'indent',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ),
      cardsBlock,
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
      defineArrayMember({
        type: 'object',
        name: 'break',
        fields: [
          defineField({
            name: 'style',
            type: 'string',
            initialValue: 'line',
            options: {
              list: ['line', 'dotted', 'blank'],
              layout: 'radio',
              direction: 'horizontal',
            },
          }),
          defineField({
            name: 'size',
            type: 'string',
            initialValue: 'medium',
            options: {
              list: ['small', 'medium', 'large'],
              layout: 'radio',
              direction: 'horizontal',
            },
          }),
          defineField({
            name: 'indent',
            type: 'boolean',
            initialValue: false,
          }),
        ],
        preview: {
          prepare() {
            return {
              title: '---- break ----',
            }
          },
        },
      }),
      defineArrayMember({
        name: 'youtube',
        type: 'object',
        fields: [
          defineField({
            name: 'url',
            type: 'url',
          }),
        ],
        preview: {
          select: {
            url: 'url',
          },
          prepare: ({ url }) => {
            return {
              title: url,
            }
          },
        },
        components: {
          preview: (props: any) => {
            console.log({ props })
            return (
              <Stack>
                {props.renderDefault(props)}
                <YouTubePreview url={props.title as string} />
              </Stack>
            )
          },
        },
      }),
    ],
    ...arg,
  })
