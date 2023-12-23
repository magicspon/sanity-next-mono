import { LinkSchema } from 'cms/queries/fragments/link.fragment'
import NextLink from 'next/link'
import * as React from 'react'
import { unwrapLinkTree } from '~utils/unwrapLinkTree'

export interface TLinkProps {
  children: React.ReactNode
  link: LinkSchema['links'][number]
}

export function Link({ children, link }: TLinkProps) {
  let href = link.href as string
  if (link.type === 'internal') {
    href = unwrapLinkTree(link.href)
  }
  const local = link.type !== 'external'
  const Component = local ? NextLink : 'a'
  const rel = link.type !== 'external' ? 'noreferrer noopener' : undefined
  return (
    <Component href={href} rel={rel}>
      {children}
    </Component>
  )
}
