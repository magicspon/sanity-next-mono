// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ts waffles
import { createNextPageTreeClient } from '@q42/sanity-plugin-page-tree/next'
import { client } from '../lib/client'
import { pageTreeConfig } from '../page-tree-config'

export const pageTreeClient = createNextPageTreeClient({
  config: pageTreeConfig,
  client: client,
})

export const getAllPageMetadata = async () =>
  (await pageTreeClient.getAllPageMetadata()) as {
    path: string
    type: string
    _id: string
    __updatedAt: string
  }[]
