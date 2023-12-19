'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { VariantProps, cva } from 'class-variance-authority'

export const Root = AccordionPrimitive.Root
export const Header = AccordionPrimitive.Header

const itemVariants = cva(null, {
  variants: {
    variant: {
      line: 'border-b',
      box: 'border border-primary px-5',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})

export const Item = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
    VariantProps<typeof itemVariants>
>(function Item({ className, variant, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={itemVariants({ className, variant })}
      {...props}
    />
  )
})

export const Indicator = () => (
  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
)

export const BoxIndicator = () => (
  <svg
    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M19.3337 9.667V10.3336C19.3337 10.7018 19.0353 11.0003 18.6671 11.0003H11.0004V18.667C11.0004 19.0351 10.7019 19.3336 10.3337 19.3336H9.66706C9.29886 19.3336 9.00036 19.0351 9.00036 18.667V11.0003H1.33366C0.965473 11.0003 0.666992 10.7018 0.666992 10.3336V9.667C0.666992 9.2988 0.965473 9.0003 1.33366 9.0003H9.00036V1.33365C9.00036 0.965463 9.29886 0.666992 9.66706 0.666992H10.3337C10.7019 0.666992 11.0004 0.965463 11.0004 1.33365V9.0003H18.6671C19.0353 9.0003 19.3337 9.2988 19.3337 9.667Z"
      fill="#180048"
    />
  </svg>
)

const triggerVariants = cva('flex items-center transition-all ', {
  variants: {
    variant: {
      line: 'flex-1 justify-between relative py-4 text-sm font-semibold hover:underline [&[data-state=open]>svg]:rotate-180',
      box: 'text-lg lg:text-2xl py-5 justify-between flex-1 [&[data-state=open]>svg]:rotate-45 text-left',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})

export const Trigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    VariantProps<typeof triggerVariants>
>(function Trigger({ className, children, variant, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={triggerVariants({ className, variant })}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

const contentVariants = cva(
  'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden',
  {
    variants: {
      variant: {
        line: 'text-sm',
        box: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'line',
    },
  },
)

const contentInnerVariants = cva('pt-0', {
  variants: {
    variant: {
      line: 'pb-4',
      box: 'pb-6',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})

export const Content = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
    VariantProps<typeof contentVariants>
>(function Content({ className, children, variant, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={contentVariants({ className, variant })}
      {...props}
    >
      <div className={contentInnerVariants({ variant })}>{children}</div>
    </AccordionPrimitive.Content>
  )
})
