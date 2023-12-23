import {
  FieldDefinitionBase,
  SlugDefinition,
  StringDefinition,
  TextDefinition,
  defineField,
} from 'sanity'
import slugify from 'utils/slugify'

export const titleField = (
  arg: Partial<StringDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'title',
    type: 'string',
    title: 'Title',
    validation: (rule) => rule.required(),
    ...arg,
  })

export const stringField = (
  arg: Partial<StringDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'text',
    type: 'string',
    title: 'Text',
    ...arg,
  })

export const slugField = (
  arg: Partial<SlugDefinition> & Partial<FieldDefinitionBase> = {},
) => {
  const { options, ...rest } = arg

  return defineField({
    name: 'slug',
    type: 'slug',
    options: {
      source: 'title',
      slugify: (input) => slugify(input).slice(0, 200),
      ...options,
    },
    validation: (rule) => rule.required(),
    ...rest,
  })
}

export const plainText = (
  arg: Partial<TextDefinition> & Partial<FieldDefinitionBase> = {},
) =>
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 3,
    ...arg,
  })
