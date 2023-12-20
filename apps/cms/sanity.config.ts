import { DocumentDefinition, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'
import { webhooks } from 'sanity-plugin-webhooks'
import { workflow } from 'sanity-plugin-workflow'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { groqdPlaygroundTool } from 'groqd-playground'
import { PROJECT_ID } from './lib/env'
import { home } from './schemas/channel/home'
import { page } from './schemas/channel/page'
import { createPageTreeDocumentList } from '@q42/sanity-plugin-page-tree'
import { pageTreeConfig } from './page-tree-config'
import { product } from './schemas/channel/product'
import { settings } from './schemas/channel/settings'
import { SchemaIcon } from '@sanity/icons'

const singles = [settings]

const config = defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'sandbox',
  projectId: PROJECT_ID,
  dataset: 'production',

  plugins: [
    dashboardTool({
      widgets: [projectUsersWidget(), projectInfoWidget()],
    }),

    deskTool({
      structure: (S) => {
        const makeSingle = (schema: DocumentDefinition) =>
          S.listItem()
            .title(schema.title!)
            .id(schema.name)
            .child(S.document().schemaType(schema.name).documentId(schema.name))
            .showIcon(false)

        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Singles')
              .icon(SchemaIcon)
              .child(
                S.list()
                  .title('Pages')
                  .items([...singles.map(makeSingle)]),
              ),
            S.divider(),
            S.listItem()
              .title('Pages')
              .child(
                createPageTreeDocumentList(S, {
                  config: pageTreeConfig,
                  extendDocumentList: (builder) =>
                    builder
                      .id('page')
                      .title('Pages')
                      .apiVersion(pageTreeConfig.apiVersion),
                }),
              ),
          ])
      },
    }),
    workflow({
      // Required, list of document type names
      // schemaTypes: ['article', 'product'],
      schemaTypes: ['page'],
      // Optional, see below
      // states: [],
    }),
    media(),
    webhooks(),
    groqdPlaygroundTool(),
    unsplashImageAsset(),
  ],

  schema: {
    types: [settings, home, page, product],
  },
})

export default config
