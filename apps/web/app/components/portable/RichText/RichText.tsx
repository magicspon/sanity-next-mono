import * as React from 'react'
import { PortableText, type PortableTextProps } from '@portabletext/react'
import { Links } from '~components/portable/shared/Links'
import { Link } from '../marks/Link'
import { Text } from 'ui/src/primitives/Text'
import { Heading } from 'ui/src/primitives/Heading'
import { createIdFromChildren } from '~utils/createIdFromChildren'
import { RichText } from 'cms/queries/fragments/portable.fragment'
import * as style from '../shared/variants'
import { createBlock } from '../shared/block'

export type BlockProps = {
  block: RichText
} & style.Variant

export function RichText({ block, variant }: BlockProps) {
  return (
    <>
      <PortableText
        value={block as PortableTextProps['value']}
        components={{
          types: {
            links: ({ value }) => {
              return (
                <div className="[&:has(+*)]:mb-5">
                  <Links links={value.links} layout={value.layout} />
                </div>
              )
            },
          },
          block: createBlock({ variant, layout: 'content' }),
          list: {
            // Ex. 1: customizing common list types
            bullet: ({ children }) => (
              <ul className="list-disc list-inside [&:has(+*)]:mb-8 space-y-2 trim text-base">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal [&:has(+*)]:mb-8 space-y-2 trim text-base">
                {children}
              </ol>
            ),
          },
          marks: {
            link: ({ children, value }) => {
              return <Link link={value}>{children}</Link>
            },
            highlight: ({ children }) => {
              return (
                <span className={style.highlight({ variant })}>{children}</span>
              )
            },
          },
        }}
      />
    </>
  )
}
