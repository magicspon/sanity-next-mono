import { defineArrayMember, defineField, defineType } from 'sanity'
import { linkField } from '../fields/link'

export const mainMenu = defineType({
  name: 'mainMenu',
  type: 'document',
  title: 'Main menu',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'item',
          type: 'object',
          fields: [
            linkField(),
            defineField({
              name: 'children',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'item',
                  type: 'object',
                  fields: [
                    linkField(),
                    defineField({
                      name: 'children',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          name: 'item',
                          type: 'object',
                          fields: [linkField()],
                          preview: {
                            select: {
                              title: 'link.text',
                            },
                            prepare: ({ title }) => {
                              return {
                                title,
                              }
                            },
                          },
                        }),
                      ],
                    }),
                  ],

                  preview: {
                    select: {
                      title: 'link.text',
                      children: 'children',
                    },
                    prepare: ({ title, children }) => {
                      return {
                        title,
                        subtitle: children
                          ? `Child nodes: ${children?.length}`
                          : ' ',
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'link.text',
              children: 'children',
            },
            prepare: ({ title, children }) => {
              return {
                title,
                subtitle: children ? `Child nodes: ${children?.length}` : ' ',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Main menu',
      }
    },
  },
})
