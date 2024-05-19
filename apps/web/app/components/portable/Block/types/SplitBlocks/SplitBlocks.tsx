import clsx from 'clsx'
import { PortableBlocks } from 'cms/queries/fragments/portable.fragment'
import Image from 'next/image'
import * as React from 'react'
import { Heading } from 'ui/src/primitives/Heading'
import { Stack } from 'ui/src/primitives/Stack'
import { RichText } from '~/components/portable/RichText'
import { imageProps } from '~/utils/imageProps'

export interface TSplitBlocksProps {}

export function SplitBlocks({ cards }: PortableBlocks) {
  return (
    <>
      {cards?.map((card) => (
        <div
          className="col-[full] grid grid-cols-site grid-flow-col-dense"
          key={card._key}
        >
          <div
            className={clsx(
              card.flip
                ? 'col-start-4 col-end-6 pr-12'
                : 'col-start-6 col-end-8 pl-12',
              'self-center',
            )}
          >
            <Stack>
              <Heading>{card.title}</Heading>
              <RichText block={card.body} />
            </Stack>
          </div>
          <div
            className={clsx(
              card.flip ? 'col-start-6 col-end-11' : 'col-start-1 col-end-6',
            )}
          >
            {card.image && <Image {...imageProps(card.image)} />}
          </div>
        </div>
      ))}
    </>
  )
}
