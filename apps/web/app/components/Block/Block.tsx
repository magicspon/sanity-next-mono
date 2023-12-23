import * as React from 'react'
import { PortableText, type PortableTextProps } from '@portabletext/react'
import clsx from 'clsx'
import Image from 'next/image'
import { imageProps } from '~utils/imageProps'
import type { PageDocument } from 'cms/queries/selection/page.selection'
import { Links } from '~components/Block/types/Links'
import { Link } from './marks/Link'
import { Blocks } from './types/Blocks'
import { Images } from './types/Images'

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
              return <Links links={value.links} layout={value.layout} />
            },
            blocks: ({ value }) => {
              return <Blocks {...value} />
            },
            images: ({ value }) => {
              return <Images {...value} />
            },
          },
          marks: {
            link: ({ children, value }) => {
              return <Link link={value}>{children}</Link>
            },
          },
        }}
      />
    </div>
  )
}
