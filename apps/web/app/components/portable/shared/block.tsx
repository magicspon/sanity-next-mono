import { PortableTextBlockComponent } from '@portabletext/react'
import { Heading } from 'ui/src/primitives/Heading'
import { Text } from 'ui/src/primitives/Text'
import { createIdFromChildren } from '~/utils/createIdFromChildren'
import * as style from './variants'

export const createBlock = ({ variant }: style.Variant) => {
  const block: Record<string, PortableTextBlockComponent> = {
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
        className={style.heading2({
          variant,
        })}
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
    large: ({ children }) => (
      <Text intent="lg" className={style.normal({ variant })}>
        {children}
      </Text>
    ),
    largeIndent: ({ children }) => (
      <Text
        intent="lg"
        className={style.normal({
          variant,
          className: '[&:has(+*)]:mb-5 col-start-5 col-span-3',
        })}
      >
        {children}
      </Text>
    ),
    subHeading: ({ children }) => (
      <Text className={style.subHeading({ variant })}>{children}</Text>
    ),
    normal: ({ children }) => (
      <Text className={style.normal({ variant })}>{children}</Text>
    ),
    quote: ({ children }) => (
      <blockquote>
        <Text className={style.normal({ variant })}>{children}</Text>
      </blockquote>
    ),
    indent: ({ children }) => (
      <Text className="[&:has(+*)]:mb-5 col-start-5 col-span-3">
        {children}
      </Text>
    ),
  }
  return block
}
