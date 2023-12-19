import { makeSafeQueryRunner, q, type Selection } from 'groqd'
import { client, SANITY_READ_TOKEN } from './client'

export const runQuery = makeSafeQueryRunner(
  (query, params = {}, options = {}) => client.fetch(query, params, options),
)

export const runDraftQuery = makeSafeQueryRunner(
  (query, params: Record<string, unknown> = {}) =>
    client.fetch(query, params, {
      token: SANITY_READ_TOKEN,
      perspective: 'previewDrafts',
    }),
)

const unknownArrayQuery = q('').filter('')
export type UnknownArrayQuery = typeof unknownArrayQuery

export function paginate<T extends Selection>(
  query: UnknownArrayQuery,
  selection: T,
  pageIndex: number,
  pageSize: number,
) {
  return q('').grab({
    posts: query
      .grab$(selection)
      .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize - 1)
      .order('publishDate desc'),

    totalCount: [`count(${query.query})`, q.number()],
  })
}
