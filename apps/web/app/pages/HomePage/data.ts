import { homeQuery } from 'cms/queries/pages/home.query'
// import { getAllPageMetadata } from 'cms/queries/tree'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export async function getData() {
  const [draftMode, runner] = createSanityFetcher()
  const data = await runner(homeQuery, {}, { next: { tags: ['home'] } })
  // const allPagesMetadata = await getAllPageMetadata()
  return { data, draftMode, query: homeQuery.query }
}
