import { homeQuery } from 'cms/queries/pages/home.query'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export async function getData() {
  const [draftMode, runner] = createSanityFetcher()
  const data = await runner(homeQuery, {}, { next: { tags: ['home'] } })
  return { data, draftMode, query: homeQuery.query }
}
