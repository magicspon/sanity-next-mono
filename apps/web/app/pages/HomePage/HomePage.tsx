import { HomeQuery } from 'cms/queries/pages/home.query'

export function HomePage({ data }: { data: HomeQuery }) {
  return (
    <div>
      <h1>Home page</h1>
      <pre>{JSON.stringify({ data }, null, 2)}</pre>
    </div>
  )
}
