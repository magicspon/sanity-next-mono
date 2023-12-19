import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'

export const Root = TabsPrimitive.Root

const listVariants = cva(null, {
  variants: {
    variant: {
      auto: '',
      default:
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
    },
  },
  defaultVariants: {},
})

export const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof listVariants>
>(function List({ className, variant, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={listVariants({ className, variant })}
      {...props}
    />
  )
})

const triggerVariants = cva(null, {
  variants: {
    variant: {
      auto: '',
      default:
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
    },
  },
  defaultVariants: {},
})

export const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof triggerVariants>
>(function Trigger({ className, variant, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={triggerVariants({ className, variant })}
      {...props}
    />
  )
})

const contentVariants = cva(null, {
  variants: {
    variant: {
      auto: '',
      default:
        'rounded-md px-3 py-1 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
    },
  },
  defaultVariants: {},
})

export const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
    VariantProps<typeof contentVariants>
>(function Content({ className, variant, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={contentVariants({ className, variant })}
      {...props}
    />
  )
})
