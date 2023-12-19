'use client'

import * as React from 'react'
import clsx from 'clsx'
import { RemoveScroll } from 'react-remove-scroll'
import { DismissableLayer } from '@radix-ui/react-dismissable-layer'
import { Slot } from '@radix-ui/react-slot'
import { useEventListener } from 'usehooks-ts'

export const Group = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>(function Group({ asChild, ...props }, ref) {
  const Comp = asChild ? Slot : 'div'
  return <Comp ref={ref} {...props} />
})

export const Label = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>(function Label({ asChild, ...props }, ref) {
  const Comp = asChild ? Slot : 'div'
  return <Comp ref={ref} {...props} />
})

export const Item = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean }
>(function Item({ asChild, className, ...props }, ref) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      ref={ref}
      className={clsx('py-3 px-5 -mx-5 hover:bg-muted', className)}
      data-autocomplete-item
      {...props}
    />
  )
})

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean }
>(function Label({ asChild, ...props }, ref) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-autocomplete-button ref={ref} {...props} />
})

type TAutoCompleteContext = {
  open: boolean
  onOpenChange: (v: boolean) => void
  container?: React.RefObject<HTMLDivElement>
  selectedIndex?: number
  setIndex: (v: number) => void
}

const AutoCompleteContext = React.createContext<TAutoCompleteContext>(null!)

type AutoCompleteProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function Root({
  children,
  onOpenChange,
  open,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & AutoCompleteProps) {
  const container = React.useRef<HTMLDivElement>(null!)
  const [index, setIndex] = React.useState<number>(0)
  const countRef = React.useRef<number>(-1)

  React.useEffect(() => {
    if (!open) {
      countRef.current = -1
    }
  }, [open])

  useEventListener(
    'keydown',
    (e) => {
      if (e.code === 'Escape') {
        countRef.current -= 1
        onOpenChange(false)
        return
      }

      const $nodes = container.current?.querySelectorAll(
        '[data-autocomplete-button]',
      )
      const count = $nodes?.length

      if (e.code === 'ArrowDown' && countRef.current < count - 1) {
        countRef.current += 1
      }

      if (e.code === 'ArrowUp') {
        if (countRef.current === 0) {
          const $input = document.querySelector(
            '[data-autocomplete-input]',
          ) as HTMLInputElement
          if ($input) {
            const value = $input.value
            $input.focus()
            setTimeout(() => {
              $input.selectionStart = $input.selectionEnd = value.length
            })
            countRef.current = -1
          }
          return
        }

        if (countRef.current > 0) countRef.current -= 1
      }

      const $btn = $nodes?.[countRef.current] as
        | HTMLButtonElement
        | HTMLAnchorElement
        | null

      if ($btn) {
        $btn.focus()
      }
    },
    container,
  )

  return (
    <AutoCompleteContext.Provider
      value={{
        open,
        onOpenChange,
        container,
        selectedIndex: index,
        setIndex,
      }}
    >
      <div {...props} className={className} data-state={open ? 'active' : ''}>
        {children}
      </div>
    </AutoCompleteContext.Provider>
  )
}

export function Content({
  className,
  children,
  disableOutsidePointerEvents = false,
  onPointerDownOutside,
  ...props
}: React.ComponentPropsWithoutRef<typeof DismissableLayer>) {
  const { open, onOpenChange, container } =
    React.useContext(AutoCompleteContext)

  return open ? (
    <RemoveScroll allowPinchZoom as={Slot}>
      <DismissableLayer
        asChild
        onPointerDownOutside={(event) => {
          const target = event.target as HTMLElement
          const isPointerDownInForm = container?.current?.contains(target)
          if (!isPointerDownInForm) {
            onOpenChange(false)
          }
          if (onPointerDownOutside) onPointerDownOutside(event)
        }}
        disableOutsidePointerEvents={disableOutsidePointerEvents}
      >
        <div
          className={clsx(
            className,
            'absolute left-0 px-5 overflow-auto h-[334px] w-full',
          )}
          ref={container}
          {...props}
        >
          {children}
        </div>
      </DismissableLayer>
    </RemoveScroll>
  ) : null
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      className={clsx(className, 'px-4 h-12 relative z-20 text-foreground')}
      ref={ref}
      data-autocomplete-input
      {...props}
    />
  )
})

export function Overlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { open } = React.useContext(AutoCompleteContext)
  return (
    <div
      data-state={open ? 'active' : null}
      {...props}
      className={clsx(
        className,
        'absolute top-0 left-0 w-full pointer-events-none',
      )}
    />
  )
}
