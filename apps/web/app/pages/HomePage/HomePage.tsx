import type { HomeQuery } from 'cms/queries/pages/home.query'
import { notFound } from 'next/navigation'
import { getFirstOrNull } from 'utils/getFirstOrNull'
import { Stack } from '~/components/Stack'

export function HomePage({ data }: { data: HomeQuery }) {
  const page = getFirstOrNull(data.page)
  if (!page) notFound()
  // return <Block variant="primary" block={page.body} />

  return (
    <Stack gap={{ base: 20, md: 60, lg: 80 }}>
      <div>item</div>
      <Stack scale={1.3} gap={10}>
        <div>item</div>
        <div>item</div>
        <div>item</div>
      </Stack>
      <div>item</div>
    </Stack>
  )
}
