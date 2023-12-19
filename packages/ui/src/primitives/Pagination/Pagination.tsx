'use client'

import * as React from 'react'
import { Flex } from '../Flex'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'

export interface TPaginationProps {}

type CoreProps = React.PropsWithChildren<{
  asChild?: boolean
  className?: string
}>

const PaginationContext = React.createContext<{ page: number; total: number }>(
  null!,
)

const usePaginationContext = () => React.useContext(PaginationContext)

export function Root({
  children,
  align = 'stretch',
  justify = 'center',
  page,
  total,
  ...props
}: React.ComponentProps<typeof Flex> & { page: number; total: number }) {
  return (
    <PaginationContext.Provider value={{ page, total }}>
      <Flex asChild align={align} justify={justify} {...props}>
        <nav>{children}</nav>
      </Flex>
    </PaginationContext.Provider>
  )
}

export const First = React.forwardRef<HTMLAnchorElement, CoreProps>(
  function First({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : 'a'
    const { page } = usePaginationContext()
    const disabled = page === 1
    return (
      <Component
        className={clsx(className, 'inline-flex h-10 md:h-10')}
        ref={ref}
        {...props}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) e.preventDefault()
        }}
      />
    )
  },
)

export const Last = React.forwardRef<HTMLAnchorElement, CoreProps>(
  function Last({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : 'a'
    const { page, total } = usePaginationContext()
    const disabled = page === total

    return (
      <Component
        className={clsx(className, 'inline-flex h-10 md:h-10')}
        ref={ref}
        {...props}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) e.preventDefault()
        }}
      />
    )
  },
)

export const Previous = React.forwardRef<HTMLAnchorElement, CoreProps>(
  function Previous({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : 'a'
    const { page } = usePaginationContext()
    const disabled = page === 1

    return (
      <Component
        className={clsx(className, 'inline-flex h-10 md:h-10')}
        ref={ref}
        {...props}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) e.preventDefault()
        }}
      />
    )
  },
)

export const Next = React.forwardRef<HTMLAnchorElement, CoreProps>(
  function Next({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : 'a'
    const { page, total } = usePaginationContext()
    const disabled = page === total

    return (
      <Component
        className={clsx(className, 'inline-flex h-10 md:h-10')}
        ref={ref}
        {...props}
        aria-disabled={disabled}
        onClick={(e) => {
          if (disabled) e.preventDefault()
        }}
      />
    )
  },
)

export const Group = React.forwardRef<HTMLDivElement, CoreProps>(function Group(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : 'div'
  return <Component className={clsx(className, 'flex')} ref={ref} {...props} />
})

export const Item = React.forwardRef<
  HTMLAnchorElement,
  CoreProps & { value: number }
>(function Item(
  {
    asChild,
    className = 'border-t-2 border-transparent data-active:border-background',
    value,
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : 'a'
  const { page } = usePaginationContext()
  return (
    <Component
      className={clsx(
        className,
        'inline-flex items-center text-center justify-center w-6 h-6 md:w-10 md:h-10 border-t',
      )}
      ref={ref}
      data-state={value === page ? 'active' : ''}
      {...props}
    />
  )
})

export const Arrow = React.forwardRef<
  SVGSVGElement,
  React.ComponentProps<typeof ArrowLeftIcon> & { forward?: boolean }
>(function Arrow({ className = 'w-5', forward, ...props }, ref) {
  return (
    <ArrowLeftIcon
      className={clsx(className, forward && 'rotate-180')}
      {...props}
      ref={ref}
    />
  )
})
