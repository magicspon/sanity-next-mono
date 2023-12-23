import { InferType, q } from 'groqd'
import { pageDocument } from '../selection/page.selection'

export const pageQuery = q('').grab({
  page: q('*')
    .filter("_id == $id && !(_id in path('drafts.**'))")
    .grab$(pageDocument),
})

export type PageQuery = InferType<typeof pageQuery>
