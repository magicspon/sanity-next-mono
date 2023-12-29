import { PortableBlocks } from 'cms/queries/fragments/portable.fragment'
import * as React from 'react'
import { Heading } from 'ui/src/primitives/Heading'
import { RichText } from '~components/portable/RichText'
import { Stack } from 'ui/src/primitives/Stack'
import Image from 'next/image'
import { imageProps } from '~utils/imageProps'
import clsx from 'clsx'

export interface TBlocksProps {}

const left = 'col-start-1'
const right = 'col-start-2'

export function StackBlocks({ cards }: PortableBlocks) {
  return (
    <>
      {cards?.map((card) => (
        <div
          className="col-[content] grid grid-cols-2 grid-flow-col-dense"
          key={card._key}
        >
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
        </div>
      ))}
    </>
  )
}
