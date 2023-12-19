import { q, type Selection } from 'groqd'

const unknownArrayQuery = q('').filter('')
export type UnknownArrayQuery = typeof unknownArrayQuery

type PaginationArgs<T> = {
  query: UnknownArrayQuery
  selection: T
  pageIndex: number
  pageSize: number
  orderBy?: string
}

export function paginate<T extends Selection>({
  query,
  selection,
  pageIndex,
  pageSize,
  orderBy = '_createdAt desc',
}: PaginationArgs<T>) {
  return q('').grab({
    posts: query
      .order(orderBy)
      .grab$(selection)
      .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize - 1),

    totalCount: [`count(${query.query})`, q.number()],
  })
}
