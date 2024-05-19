import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva('', {
  variants: {
    variant: {
      default: '',
      secondary: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'default',
  },
})

export type FooterVariants = VariantProps<typeof variants>

type TElementProps = React.ComponentProps<'div'>

export type TFooterProps = TElementProps &
  FooterVariants & {
    //
  }

export const Footer = React.forwardRef<React.ElementRef<'div'>, TFooterProps>(
  function Footer({ className, variant, ...props }, ref) {
    console.info(`<Footer />`, props)
    return (
      <div
        data-testid="Footer"
        ref={ref}
        className={variants({ className, variant })}
        {...props}
      />
    )
  },
)
