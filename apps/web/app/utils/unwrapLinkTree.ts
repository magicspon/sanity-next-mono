type TLinkRef = {
  slug: string
  parent?: TLinkRef
}

export function unwrapLinkTree(link: TLinkRef, items: string[] = []) {
  if (link.parent) {
    items.push(link.slug)
    return unwrapLinkTree(link.parent, items)
  } else {
    items.push(link.slug)
  }
  return `/${items.reverse().join('/')}`
}
