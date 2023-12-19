import { runQuery } from 'cms/lib/runner'
import { homeQuery } from 'cms/queries/pages/home.query'
import * as React from 'react'

async function getData() {
  const data = await runQuery(homeQuery, {}, { next: { tags: ['home'] } })

  return data
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
