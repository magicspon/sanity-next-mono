import { cva, VariantProps } from 'class-variance-authority'

export const heading1 = cva('col-[content]', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-10 font-semibold',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const heading2 = cva('col-[content] font-semibold', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-8',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const heading3 = cva('col-[content] font-semibold', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const heading4 = cva('col-[content] font-bold', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const normal = cva('col-[content]', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const highlight = cva('col-[content]', {
  variants: {
    variant: {
      primary: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type Variant = VariantProps<typeof heading1>
