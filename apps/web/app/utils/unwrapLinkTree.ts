export type TLinkRef = {
  slug: string
  parent?: TLinkRef
}

export function unwrapLinkTree(link: TLinkRef, slugs: string[] = []): string {
  slugs.push(link.slug)
  if (link.parent) {
    return unwrapLinkTree(link.parent, slugs)
  }
  return `/${slugs.reverse().join('/')}`
}
