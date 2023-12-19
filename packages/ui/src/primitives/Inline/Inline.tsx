import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

const gaps = {
  xs: 'gap-1',
  sm: 'gap-3',
  base: 'gap-5',
  md: 'gap-8',
  lg: 'gap-10',
  xl: 'gap-12',
  '2xl': 'gap-16',
}

const style = cva('flex flex-row', {
  variants: {
    size: gaps,
    align: {
      center: 'items-center',
    },
    justify: {
      between: 'justify-between',
      around: 'justify-around',
      center: 'justify-center',
    },
    wrap: {
      true: 'flex-wrap',
    },
  },
  defaultVariants: {
    size: 'sm',
    align: 'center',
  },
})

export interface TInlineProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof style> {
  asChild?: boolean
}

export const Inline = React.forwardRef<HTMLDivElement, TInlineProps>(
  function Inline(
    { asChild, size, wrap, align, justify, className, ...props },
    ref,
  ): JSX.Element {
    const Comp = asChild ? Slot : 'div'
    const cx = style({ size, className, wrap, justify, align })

    return <Comp ref={ref} className={cx} {...props} />
  },
)
