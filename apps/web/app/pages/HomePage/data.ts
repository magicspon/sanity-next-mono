import { homeQuery } from 'cms/queries/pages/home.query'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export async function getData() {
  const [draftMopde, runner] = createSanityFetcher()
  const data = await runner(homeQuery, {}, { next: { tags: ['home'] } })
  // const allPagesMetadata = await getAllPageMetadata()
  return { data, draftMopde }
}
