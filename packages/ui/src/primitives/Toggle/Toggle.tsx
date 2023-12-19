'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '../Button'

export const toggleVariants = buttonVariants

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof buttonVariants>
>(function Toggle({ className, variant, size, behaviour, ...props }, ref) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={buttonVariants({ variant, size, className, behaviour })}
      {...props}
    />
  )
})
