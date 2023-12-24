import { InferType, q } from 'groqd'
import { listingDocument, listingTeaser } from '../selection/listing.selection'

export const listingQuery = q('').grab({
  page: q('*')
    .filter("_id == $id && !(_id in path('drafts.**'))")
    .grab$(listingDocument),
  pages: q('*').filter('parent->_id == $id').grab$(listingTeaser),
})

export type ListingQuery = InferType<typeof listingQuery>
