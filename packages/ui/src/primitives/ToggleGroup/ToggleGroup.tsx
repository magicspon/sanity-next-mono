'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { VariantProps } from 'class-variance-authority'
import { toggleVariants } from '../Toggle/Toggle'
import clsx from 'clsx'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
  behaviour: 'active',
})

export const Root = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(function Root(
  {
    className = 'flex flex-wrap items-center gap-1',
    variant,
    size,
    behaviour,
    children,
    ...props
  },
  ref,
) {
  return (
    <ToggleGroupPrimitive.Root ref={ref} className={className} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size, behaviour }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
})

export const Item = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(function Item(
  { className, children, variant, behaviour, size, ...props },
  ref,
) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={clsx(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
          behaviour: context.behaviour || behaviour,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})
