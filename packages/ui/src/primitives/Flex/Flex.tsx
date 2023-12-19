import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

const style = cva(null, {
  variants: {
    align: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      center: 'justify-center',
      start: 'justify-start',
      between: 'justify-between',
      end: 'justify-end',
    },
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      base: 'gap-4',
      md: 'gap-8',
      '2xl': 'gap-16',
    },
    wrap: {
      true: 'flex-wrap',
    },
    when: {
      sm: 'sm:flex',
      md: 'md:flex',
      lg: 'lg:flex',
    },
    inline: {
      true: 'inline-flex',
      false: 'flex',
    },
    column: {
      true: 'flex-col',
    },
  },
  defaultVariants: {
    inline: false,
  },
})

export interface TFlexProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof style> {
  asChild?: boolean
}

export const Flex = React.forwardRef<HTMLDivElement, TFlexProps>(function Flex(
  {
    asChild,
    align,
    gap,
    justify,
    className,
    wrap,
    when,
    inline,
    column,
    ...props
  },
  ref,
): JSX.Element {
  const Comp = asChild ? Slot : 'div'
  const cx = style({
    align,
    gap,
    justify,
    className,
    wrap,
    when,
    inline,
    column,
  })

  return <Comp ref={ref} className={cx} {...props} />
})
