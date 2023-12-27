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
import { post } from './schemas/channel/post'
import { settings } from './schemas/channel/settings'
import { mainMenu } from './schemas/channel/mainMenu'
import { SchemaIcon } from '@sanity/icons'
import { postCategory } from './schemas/categories/post-categories'
import { author } from './schemas/channel/author'
import { banner } from './schemas/modules/banner'
import { listing } from './schemas/channel/listing'
import { postListing } from './schemas/channel/postListing'
import { SanityDocument } from 'next-sanity'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'

const singles = [settings, mainMenu]

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
              .title('Globals')
              .icon(SchemaIcon)
              .child(
                S.list()
                  .title('Content')
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

            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    makeSingle(postListing),
                    S.documentTypeListItem(post.name).title(post.title!),
                    S.documentTypeListItem(postCategory.name).title(
                      postCategory.title!,
                    ),
                    S.documentTypeListItem(author.name).title(author.title!),
                  ]),
              ),
            S.divider(),

            S.listItem()
              .title('Modules')
              .child(
                S.list()
                  .title('Shared content')
                  .items([
                    S.documentTypeListItem(banner.name).title(banner.title!),
                  ]),
              ),
            S.divider(),
          ])
      },
      defaultDocumentNode: (S, { schemaType }) => {
        switch (schemaType) {
          case `page`:
          case `postCategory`:
          case `post`:
          case `home`: {
            return S.document().views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: {
                    origin: 'same-origin', // or 'same-origin' if the app and studio are on the same origin
                    preview: async (document: SanityDocument) => {
                      if (document?._type === 'home') return '/'
                      if (document?._type === 'postCategory')
                        return `/blog/${document.slug.current}`
                      if (document?._type === 'post')
                        return `/blog/post/${document.slug.current}`

                      return document.slug.current ?? new Error('Missing slug')
                    },
                    draftMode: '/api/draft', // the route you enable draft mode, see: https://github.com/sanity-io/visual-editing/tree/main/packages/preview-url-secret#sanitypreview-url-secret
                  },
                })
                .title('Preview'),
            ])
          }
          default: {
            return S.document().views([S.view.form()])
          }
        }
      },
    }),
    workflow({
      schemaTypes: ['page'],
    }),
    media(),
    webhooks(),
    groqdPlaygroundTool(),
    unsplashImageAsset(),
    inlineSvgInput(),
  ],

  schema: {
    types: [
      settings,
      home,
      page,
      postListing,
      post,
      author,
      listing,
      banner,
      postCategory,
      mainMenu,
    ],
  },
})

export default config
