import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

export interface TFlexSideProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export const FlexSide = React.forwardRef<HTMLDivElement, TFlexSideProps>(
  function Em({ asChild, className, ...props }, ref): JSX.Element {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp ref={ref} className={clsx(className, 'basis-0 grow')} {...props} />
    )
  },
)
