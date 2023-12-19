import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

export interface TContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof style> {
  asChild?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, TContainerProps>(
  function Container(
    { className, align, gutter, asChild, ...props },
    ref,
  ): JSX.Element {
    const cx = style({ align, gutter, className })
    const Comp = asChild ? Slot : 'div'

    return <Comp ref={ref} className={cx} {...props} />
  },
)

const style = cva('max-w-container w-full', {
  variants: {
    align: {
      center: 'mx-auto',
    },
    gutter: {
      true: 'px-5 lg:px-8',
    },
  },
  defaultVariants: {
    align: 'center',
  },
})
