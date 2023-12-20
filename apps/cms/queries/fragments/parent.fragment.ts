import { q } from 'groqd'

export const parent = q.select({
  "_type == 'home'": {
    title: q.string(),
  },
  "_type == 'page'": {
    title: q.string(),
    slug: q.slug('slug'),
    parent: q('parent')
      .deref()
      .select({
        "_type == 'home'": {
          title: q.string(),
        },
        "_type == 'page'": {
          title: q.string(),
          slug: q.slug('slug'),
          parent: q('parent')
            .deref()
            .select({
              "_type == 'home'": {
                title: q.string(),
              },
              "_type == 'page'": {
                title: q.string(),
                slug: q.slug('slug'),
              },
            }),
        },
      }),
  },
})
