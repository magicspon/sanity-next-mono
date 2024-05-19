import * as React from 'react'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

type Gap =
  | number
  | { base?: number; sm?: number; md?: number; lg?: number; xl?: number }

type TStack = React.ComponentProps<'div'> & {
  asChild?: boolean
  scale?: number
  gap?: Gap
}

const createGapStyles = (gap: Gap) => {
  if (typeof gap === 'number') {
    return { '--stack-gap': gap }
  }

  return Object.entries(gap).reduce(
    (acc, [key, value]) => {
      if (key === 'base') {
        acc[`--stack-gap`] = value
      } else {
        acc[`--stack-gap-${key}`] = value
      }

      return acc
    },
    {} as Record<string, string | number>,
  )
}

const createGapClassName = (gap: Gap) => {
  if (typeof gap === 'number') return 'stack-gap'

  return Object.keys(gap)
    .reduce((acc, key) => {
      if (key === 'base') return acc
      return `${acc}${key}:stack-gap `
    }, '' as string)
    .trim()
}

export const Stack = React.forwardRef<React.ElementRef<'div'>, TStack>(
  function Stack({ scale = 1, gap = 4, className, asChild, ...props }, ref) {
    const Comp = asChild ? Slot : 'div'
    const style = createGapStyles(gap)
    const cx = createGapClassName(gap)

    return (
      <Comp
        ref={ref}
        style={{ '--scale': scale, ...style } as React.CSSProperties}
        className={clsx(className, 'stack', cx)}
        {...props}
      />
    )
  },
)
