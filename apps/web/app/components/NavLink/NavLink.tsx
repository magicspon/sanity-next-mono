import { LinkSchema } from 'cms/queries/fragments/link.fragment'
import * as React from 'react'
import { unwrapLinkTree, type TLinkRef } from '~/utils/unwrapLinkTree'
import { Slot } from '@radix-ui/react-slot'
import NextLink from 'next/link'

export type TLinkProps = Pick<
  NonNullable<LinkSchema['links']>[number],
  'type'
> & {
  children: React.ReactNode
  href: string | TLinkRef
  asChild?: boolean
}

export const NavLink = React.forwardRef<HTMLAnchorElement, TLinkProps>(
  function NavLink({ children, type, href, asChild }, ref) {
    const _href = React.useMemo(() => {
      let h = href as string
      if (type === 'internal' && typeof href !== 'string') {
        h = unwrapLinkTree(href)
      }
      return h
    }, [type, href])
    const Component = asChild ? Slot : NextLink
    const rel = type === 'external' ? 'noreferrer noopener' : undefined
    return (
      <Component ref={ref} href={_href} rel={rel}>
        {children}
      </Component>
    )
  },
)
