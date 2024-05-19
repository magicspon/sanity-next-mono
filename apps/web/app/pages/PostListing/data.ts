import { blogQuery } from 'cms/queries/pages/blog.query'
// import { getAllPageMetadata } from 'cms/queries/tree'
import { createSanityFetcher } from '~/utils/createSanityFetcher'

export async function getData() {
  const [draftMopde, runner] = createSanityFetcher()
  const data = await runner(blogQuery, {}, { next: { tags: ['blog'] } })
  // const allPagesMetadata = await getAllPageMetadata()
  return { data, draftMopde }
}
