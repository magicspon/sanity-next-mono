import clsx from 'clsx'
import { LinkSchema } from 'cms/queries/fragments/link.fragment'
import Link from 'next/link'
import * as React from 'react'
import { Button, type ButtonVariants } from 'ui/src/primitives/Button'
import { unwrapLinkTree } from '~/utils/unwrapLinkTree'

export function Links({
  links,
  layout,
  className,
}: LinkSchema & { className?: string }) {
  const items = React.useMemo(() => {
    return links?.map((link) => {
      let href = link.href as string
      if (link.type === 'internal') {
        href = unwrapLinkTree(link.href)
      }
      link.href = href
      return link
    })
  }, [links])

  return (
    <div
      className={clsx(className, 'flex gap-5', {
        'flex-col items-start': layout === 'stack',
      })}
    >
      {items?.map((link) => {
        const local = link.type !== 'external'
        const Component = local ? Link : 'a'

        const rel = link.type !== 'external' ? 'noreferrer noopener' : undefined

        return (
          <Button
            asChild
            variant={link.variant as ButtonVariants['variant']}
            key={link._key}
          >
            <Component rel={rel} href={link.href as string}>
              {link.text}
            </Component>
          </Button>
        )
      })}
    </div>
  )
}
