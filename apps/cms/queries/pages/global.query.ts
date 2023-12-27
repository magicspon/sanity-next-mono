import { InferType, q } from 'groqd'
import { link } from '../fragments/link.fragment'

const _link = q('link').select(link)

export const globalQuery = q('').grab({
  mainMenu: q('*')
    .filter("_type == 'mainMenu'")
    .grab$({
      items: q('items')
        .filter()
        .grab$({
          _key: q.string(),
          link: _link.nullable(),
          children: q('children')
            .filter()
            .grab$({
              _key: q.string(),
              link: _link.nullable(),
              children: q('children')
                .filter()
                .grab$({
                  _key: q.string(),
                  link: _link.nullable(),
                })
                .nullable(),
            })
            .nullable(),
        }),
    }),
})

export type GlobalQuery = InferType<typeof globalQuery>
