import { InferType, q } from 'groqd'
import { homeDocument } from '../selection/home.selection'

export const homeQuery = q('').grab({
  page: q('*')
    .filter("_type == 'home' && !(_id in path('drafts.**'))")
    .grab$(homeDocument),
})

export type HomeQuery = InferType<typeof homeQuery>
