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
                      const links = children
                        ? children.map((c: any) => c.link.text).join(', ')
                        : ' '
                      return {
                        title,
                        subtitle: children ? `Children: ${links}` : ' ',
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
              const links = children
                ? children.map((c: any) => c.link.text).join(', ')
                : ' '
              return {
                title,
                subtitle: children ? `Children: ${links}` : ' ',
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
