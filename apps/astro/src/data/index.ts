import { runQuery } from 'cms/lib/runner'
import { homeQuery } from 'cms/queries/pages/home.query'

export async function getData() {
  const data = await runQuery(homeQuery, {}, { next: { tags: ['home'] } })

  return data
}
