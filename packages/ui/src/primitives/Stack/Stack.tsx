import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

const gaps = {
  none: null,
  '0': 'gap-0',
  '1': 'gap-1',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
  '24': 'gap-24',
  '36': 'gap-36',
  '40': 'gap-40',
  '56': 'gap-56',
}

const style = cva('flex flex-col', {
  variants: {
    size: gaps,

    lg: {
      none: null,
      '0': 'lg:gap-0',
      '1': 'lg:gap-1',
      '2': 'lg:gap-2',
      '3': 'lg:gap-3',
      '4': 'lg:gap-4',
      '5': 'lg:gap-5',
      '6': 'lg:gap-6',
      '8': 'lg:gap-8',
      '10': 'lg:gap-10',
      '12': 'lg:gap-12',
      '16': 'lg:gap-16',
      '24': 'lg:gap-24',
      '36': 'lg:gap-36',
      '40': 'lg:gap-40',
      '56': 'lg:gap-56',
    },
  },
  defaultVariants: {
    size: '4',
  },
})

export interface TStackProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof style> {
  asChild?: boolean
}

export const Stack = React.forwardRef<HTMLDivElement, TStackProps>(
  function Stack({ asChild, size, lg, className, ...props }, ref): JSX.Element {
    const Comp = asChild ? Slot : 'div'
    const cx = style({ size, lg, className })

    return <Comp ref={ref} className={cx} {...props} />
  },
)
