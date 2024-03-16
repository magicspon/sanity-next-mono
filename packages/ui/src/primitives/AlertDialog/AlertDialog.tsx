import * as React from 'react'
import * as RadixAlert from '@radix-ui/react-alert-dialog'
import clsx from 'clsx'
import { buttonVariants } from '../Button'
import { VariantProps } from 'class-variance-authority'

export const Root = RadixAlert.Root

export const Trigger = RadixAlert.Trigger

export function Portal({ ...props }: RadixAlert.AlertDialogPortalProps) {
  return <RadixAlert.Portal {...props} />
}

export const Overlay = React.forwardRef<
  React.ElementRef<typeof RadixAlert.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixAlert.Overlay>
>(function Overlay({ className, ...props }, ref) {
  return (
    <RadixAlert.Overlay
      className={clsx(
        'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})

export const Content = React.forwardRef<
  React.ElementRef<typeof RadixAlert.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAlert.Content>
>(function Content({ className, ...props }, ref) {
  return (
    <Portal>
      <Overlay />
      <RadixAlert.Content
        ref={ref}
        className={clsx(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
          className,
        )}
        {...props}
      />
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
        'flex flex-col space-y-2 text-center sm:text-left',
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
  React.ElementRef<typeof RadixAlert.Title>,
  React.ComponentPropsWithoutRef<typeof RadixAlert.Title>
>(function Title({ className, ...props }, ref) {
  return (
    <RadixAlert.Title
      ref={ref}
      className={clsx('text-lg font-semibold', className)}
      {...props}
    />
  )
})

export const Description = React.forwardRef<
  React.ElementRef<typeof RadixAlert.Description>,
  React.ComponentPropsWithoutRef<typeof RadixAlert.Description>
>(function Description({ className, ...props }, ref) {
  return (
    <RadixAlert.Description
      ref={ref}
      className={clsx('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})

export const Action = React.forwardRef<
  React.ElementRef<typeof RadixAlert.Action>,
  React.ComponentPropsWithoutRef<typeof RadixAlert.Action> &
    VariantProps<typeof buttonVariants>
>(function Action({ className, variant, ...props }, ref) {
  return (
    <RadixAlert.Action
      ref={ref}
      className={clsx(buttonVariants({ variant }), className)}
      {...props}
    />
  )
})

export const Cancel = React.forwardRef<
  React.ElementRef<typeof RadixAlert.Cancel>,
  React.ComponentPropsWithoutRef<typeof RadixAlert.Cancel> &
    VariantProps<typeof buttonVariants>
>(function Cancel({ className, variant, ...props }, ref) {
  return (
    <RadixAlert.Cancel
      ref={ref}
      className={clsx(
        buttonVariants({ variant: variant }),
        'mt-2 sm:mt-0',
        className,
      )}
      {...props}
    />
  )
})
