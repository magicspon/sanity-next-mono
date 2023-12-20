import { PageTreeConfig } from '@q42/sanity-plugin-page-tree'

export const pageTreeConfig: PageTreeConfig = {
  /* Root page schema type name */
  rootSchemaType: 'home',
  /* Array of all page schema type names */
  pageSchemaTypes: ['home', 'page', 'product'],
  /* Api version to be used in all underlying Sanity client use */
  apiVersion: '2023-12-08',
  /* Optionally provide the field name of the title field of your page documents, to be used to generate a slug automatically for example. */
  titleFieldName: 'title',
}
