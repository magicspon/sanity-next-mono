import { ListingProps, PageProps } from './data'

export function Page({ data }: { data: PageProps | ListingProps }) {
  return (
    <div>
      <h1>page</h1>
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
    </div>
  )
}
