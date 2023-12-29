import { blogCategoryQuery } from 'cms/queries/pages/blog.query'
// import { getAllPageMetadata } from 'cms/queries/tree'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export type Props = {
  params: {
    category: string
  }
}

export async function getData({ params }: Props) {
  const [draftMode, runner] = createSanityFetcher()
  const data = await runner(blogCategoryQuery, params, {
    next: { tags: ['category'] },
  })
  // const allPagesMetadata = await getAllPageMetadata()
  return { data, draftMode, query: blogCategoryQuery.query }
}
