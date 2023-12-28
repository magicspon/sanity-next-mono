import { PortableBlocks } from 'cms/queries/fragments/portable.fragment'
import * as React from 'react'
import { Heading } from 'ui/src/primitives/Heading'
import { Stack } from 'ui/src/primitives/Stack'
import { RichText } from '~components/portable/RichText'

export interface TBlocksProps {}

export function CardBlocks({
  // layout,
  // variant,
  cards,
  columns,
}: PortableBlocks) {
  return (
    <>
      <div
        style={
          {
            '--cols': `repeat(${columns}, minmax(0, 1fr))`,
          } as React.CSSProperties
        }
        className="grid grid-cols-[var(--cols)] ga-8"
      >
        {cards?.map((card) => (
          <Stack key={card._key}>
            <Heading intent="h4">{card.title}</Heading>
            <RichText block={card.body} />
          </Stack>
        ))}
      </div>
    </>
  )
}
