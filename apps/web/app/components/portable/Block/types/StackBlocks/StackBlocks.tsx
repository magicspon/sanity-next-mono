import { PortableBlocks } from 'cms/queries/fragments/portable.fragment'
import * as React from 'react'
import { Heading } from 'ui/src/primitives/Heading'
import { RichText } from '~components/portable/RichText'
import { Stack } from 'ui/src/primitives/Stack'
import Image from 'next/image'
import { imageProps } from '~utils/imageProps'
import clsx from 'clsx'

export interface TBlocksProps {}

const left = 'col-[content] lg:col-start-4 lg:col-end-6'
const right = 'col-[content] lg:col-start-6 lg:col-end-8'

export function StackBlocks({ cards }: PortableBlocks) {
  return (
    <>
      {cards?.map((card) => (
        <React.Fragment key={card._key}>
          {card.image && (
            <div className={clsx(card.flip ? left : right)}>
              <Image {...imageProps(card.image)} />
            </div>
          )}
          <Stack
            className={clsx(
              card.flip ? [right, 'pl-12'] : [left, 'pr-12'],
              'self-center',
            )}
          >
            <Heading>{card.title}</Heading>
            <RichText block={card.body} />
          </Stack>
        </React.Fragment>
      ))}
    </>
  )
}
