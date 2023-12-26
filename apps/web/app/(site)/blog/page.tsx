import { PostListing, getData } from '~pages/PostListing'

export default async function Index() {
  const { data } = await getData()

  return <PostListing data={data} />
}
