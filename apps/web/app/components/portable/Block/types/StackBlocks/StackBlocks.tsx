import { PortableBlocks } from 'cms/queries/fragments/portable.fragment'
import * as React from 'react'
import { Heading } from 'ui/src/primitives/Heading'
import { RichText } from '~components/portable/RichText'
import { Stack } from 'ui/src/primitives/Stack'
import Image from 'next/image'
import { imageProps } from '~utils/imageProps'

export interface TBlocksProps {}

const left = 'col-start-4 col-end-6'
const right = 'col-start-6 col-end-8'

export function StackBlocks({ cards }: PortableBlocks) {
  return (
    <>
      {cards?.map((card) => (
        <React.Fragment key={card._key}>
          {card.flip ? (
            <>
              {card.image && (
                <div className={left}>
                  <Image {...imageProps(card.image)} />
                </div>
              )}
              <Stack className={right}>
                <Heading>{card.title}</Heading>
                <RichText block={card.body} />
              </Stack>
            </>
          ) : (
            <>
              <Stack className={left}>
                <Heading>{card.title}</Heading>
                <RichText block={card.body} />
              </Stack>
              {card.image && (
                <div className={right}>
                  <Image {...imageProps(card.image)} />
                </div>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
