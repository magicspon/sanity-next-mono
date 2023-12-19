import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { cva, VariantProps } from 'class-variance-authority'

export const Root = RadixDialog.Root

export const Trigger = RadixDialog.Trigger

export const overlayVariants = cva(
  'fixed inset-0 z-50 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0',
  {
    variants: {
      intent: {
        default: 'bg-background/80 backdrop-blur-sm',
        lightbox: 'bg-black/90 backdrop-blur-sm',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
)
export const contentVariants = cva(
  'fixed z-50 w-full duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95',
  {
    variants: {
      intent: {
        default:
          'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] grid max-w-lg gap-4 border bg-background p-8 shadow-lg  sm:rounded-lg md:w-full',
        lightbox: 'flex items-center justify-center h-full w-full',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
)

export const closeButtonVariants = cva(
  'z-100 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-accent data-open:text-muted-foreground',
  {
    variants: {
      intent: {
        default: 'absolute right-4 top-4',
        lightbox: 'fixed right-4 top-4 text-white w-8',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
)

type DialogVariants = VariantProps<typeof overlayVariants>

export function Portal({ ...props }: RadixDialog.DialogPortalProps) {
  return <RadixDialog.Portal {...props} />
}

export const Overlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay> & DialogVariants
>(function Overlay({ className, intent, ...props }, ref) {
  return (
    <RadixDialog.Overlay
      ref={ref}
      className={overlayVariants({ intent, className })}
      {...props}
    />
  )
})

export const Content = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & DialogVariants
>(function Content({ className, children, intent, ...props }, ref) {
  return (
    <Portal>
      <Overlay intent={intent} />
      <RadixDialog.Content
        ref={ref}
        className={contentVariants({ intent, className })}
        {...props}
      >
        {children}
        <RadixDialog.Close
          data-testid="close-dialog"
          className={closeButtonVariants({ intent })}
        >
          <Cross2Icon className="h-8 w-8" />
          <span className="sr-only">Close</span>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </Portal>
  )
})

export function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  )
}

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  )
}

export const Title = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function Title({ className, ...props }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={clsx(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  )
})

export const Description = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function Description({ className, ...props }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={clsx('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
