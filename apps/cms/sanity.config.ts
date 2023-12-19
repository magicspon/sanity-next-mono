import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { groqdPlaygroundTool } from 'groqd-playground'
import { PROJECT_ID } from './lib/env'
import { home } from './schemas/channel/home'
import { page } from './schemas/channel/page'
import { createPageTreeDocumentList } from '@q42/sanity-plugin-page-tree'
import { pageTreeConfig } from './page-tree-config'

const config = defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'sandbox',
  projectId: PROJECT_ID,
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) => {
        return S.list()
          .title('Content')
          .items([
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
    groqdPlaygroundTool(),
  ],

  schema: {
    types: [home, page],
  },
})

export default config
