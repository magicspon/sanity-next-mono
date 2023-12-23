import * as React from 'react'
import { PortableText, PortableTextProps } from '@portabletext/react'
import clsx from 'clsx'
import Image from 'next/image'
import { imageProps } from '~utils/imageProps'
import { PageDocument } from 'cms/queries/selection/page.selection'
import { LinkSchema } from 'cms/queries/fragments/link.fragment'
import { Links } from '~components/Block/types/Links'
import { Link } from './marks/Link'

export interface TProseProps {
  block: PageDocument['body']
  className?: string
}

export function Block({ block, className }: TProseProps) {
  return (
    <div className={clsx(className, 'prose')}>
      <PortableText
        value={block as PortableTextProps['value']}
        components={{
          types: {
            image: ({ value }) => {
              return <Image {...imageProps(value)} />
            },
            links: ({ value }) => {
              const typedValue = value as LinkSchema
              return (
                <Links links={typedValue.links} layout={typedValue.layout} />
              )
            },
          },
          marks: {
            link: ({ children, value }) => {
              const typedValud = value as LinkSchema['links'][number]
              return <Link link={typedValud}>{children}</Link>
            },
          },
        }}
      />
    </div>
  )
}
