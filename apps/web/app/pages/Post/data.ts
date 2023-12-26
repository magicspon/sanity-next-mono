import { blogPostQuery } from 'cms/queries/pages/blog.query'
import { createSanityFetcher } from '~utils/createSanityFetcher'

export type Props = {
  params: {
    slug: string
  }
}

export async function getData({ params }: Props) {
  const [draftMopde, runner] = createSanityFetcher()
  const data = await runner(
    blogPostQuery,
    {
      slug: params.slug,
    },
    { next: { tags: ['post'] } },
  )
  // const allPagesMetadata = await getAllPageMetadata()
  return { data, draftMopde }
}
