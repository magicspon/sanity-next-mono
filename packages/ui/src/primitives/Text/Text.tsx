import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

export type TextStyleProps = VariantProps<typeof textVariants>

export interface TTextProps
  extends React.HTMLAttributes<
      | HTMLParagraphElement
      | HTMLHeadingElement
      | HTMLDivElement
      | HTMLSpanElement
    >,
    TextStyleProps {
  asChild?: boolean
}

export const Text = React.forwardRef<
  HTMLParagraphElement | HTMLHeadingElement | HTMLDivElement,
  TTextProps
>(function Text(
  { asChild, className, weight, intent, hue, center, noTrim = false, ...props },
  ref,
): JSX.Element {
  const Comp = asChild ? Slot : 'p'
  const cx = textVariants({
    weight,
    className,
    noTrim,
    center,
    intent,
    hue,
  })

  return <Comp ref={ref} className={cx} {...props} />
})

export const Span = React.forwardRef<HTMLSpanElement, TTextProps>(function Text(
  { className, weight, intent, center, hue, noTrim = false, ...props },
  ref,
): JSX.Element {
  const cx = textVariants({
    weight,
    className,
    noTrim,
    center,
    intent,
    hue,
  })

  return <span ref={ref} className={cx} {...props} />
})

export const textVariants = cva('font-sans', {
  variants: {
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },

    intent: {
      xs: 'text-xs',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'md:text-lg',
      xl: 'text-lg md:text-xl',
      none: '',
    },

    center: {
      true: 'text-center',
    },

    hue: {
      copy: 'text-copy',
      brand: 'text-primary',
      accent: 'text-accent',
    },

    noTrim: {
      false: 'trim',
    },
  },
  defaultVariants: {
    weight: 'normal',
    intent: 'default',
    noTrim: false,
  },
})
