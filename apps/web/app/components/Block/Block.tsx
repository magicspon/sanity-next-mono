import * as React from 'react'
import { PortableText, type PortableTextProps } from '@portabletext/react'
import { Links } from '~components/Block/types/Links'
import { Link } from './marks/Link'
import { Blocks } from './types/Blocks'
import { Images } from './types/Images'
import { Text } from 'ui/src/primitives/Text'
import { Heading } from 'ui/src/primitives/Heading'
import { createIdFromChildren } from '~utils/createIdFromChildren'
import { Body } from 'cms/queries/fragments/portable.fragment'
import * as style from './variants'

export type BlockProps = {
  block: Body
} & style.Variant

export function Block({ block, variant }: BlockProps) {
  return (
    <PortableText
      value={block as PortableTextProps['value']}
      components={{
        types: {
          links: ({ value }) => {
            return (
              <div className="col-[content]">
                <Links links={value.links} layout={value.layout} />
              </div>
            )
          },
          blocks: ({ value }) => {
            return (
              <div className="col-[full]">
                <Blocks {...value} />
              </div>
            )
          },
          images: ({ value }) => {
            return (
              <div className="col-[full] [&:has(+*)]:mb-12">
                <Images {...value} />
              </div>
            )
          },
        },
        block: {
          h1: ({ children }) => (
            <Heading
              id={createIdFromChildren(children)}
              level={1}
              intent="h1"
              className={style.heading1({ variant })}
            >
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading
              id={createIdFromChildren(children)}
              level={2}
              intent="h2"
              className={style.heading2({ variant })}
            >
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading
              id={createIdFromChildren(children)}
              level={3}
              intent="h3"
              className={style.heading3({ variant })}
            >
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading
              id={createIdFromChildren(children)}
              level={4}
              intent="h4"
              className={style.heading4({ variant })}
            >
              {children}
            </Heading>
          ),
          normal: ({ children }) => (
            <Text className={style.normal({ variant })}>{children}</Text>
          ),
          indent: ({ children }) => (
            <Text className="[&:has(+*)]:mb-5 ml-24">{children}</Text>
          ),
        },
        list: {
          // Ex. 1: customizing common list types
          bullet: ({ children }) => (
            <ul className="col-[content] list-disc list-inside [&:has(+*)]:mb-8 space-y-2 trim text-base">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="col-[content] list-decimal [&:has(+*)]:mb-8 space-y-2 trim text-base">
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
  )
}
