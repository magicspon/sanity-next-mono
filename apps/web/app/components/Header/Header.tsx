import { GlobalQuery } from 'cms/queries/pages/global.query'
import Link from 'next/link'
import * as React from 'react'
import { NavLink } from '~components/NavLink'
import { TLinkRef } from '~utils/unwrapLinkTree'

type MenuItem = GlobalQuery['mainMenu'][number]

export interface THeaderProps {
  items?: {
    _key: string
    link: NonNullable<MenuItem['items'][number]['link']>
  }[]
}

export function Header({ items }: THeaderProps) {
  return (
    <header>
      <Link href="/">index</Link>
      {items && (
        <nav>
          {items.map((item) => (
            <NavLink
              key={item._key}
              href={item.link.href as string | TLinkRef}
              type={item.link.type}
            >
              {item.link!.text}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
