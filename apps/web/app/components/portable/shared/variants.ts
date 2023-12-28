import { cva, VariantProps } from 'class-variance-authority'

export const heading1 = cva(null, {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-10 font-semibold',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export const heading2 = cva('font-semibold', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-8',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export const heading3 = cva('font-semibold', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export const heading4 = cva('font-bold', {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export const normal = cva(null, {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export const highlight = cva(null, {
  variants: {
    variant: {
      primary: 'text-primary',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export const subHeading = cva(null, {
  variants: {
    variant: {
      primary: '[&:has(+*)]:mb-6 text-sm trim font-bold uppercase text-primary',
    },
    layout: {
      content: 'col-[content]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    layout: 'content',
  },
})

export type Variant = VariantProps<typeof heading1>
