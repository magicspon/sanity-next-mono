import * as React from 'react'
import { motion, Variant } from 'framer-motion'
import { VisuallyHidden } from '../VisuallyHidden'

export const entrance = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

interface TFilling {
  isOpen: boolean
  closed: Variant
  open: Variant
}

function Filling({ isOpen, closed, open }: TFilling) {
  return (
    <motion.span
      key="a"
      initial="closed"
      variants={{
        closed,
        open,
      }}
      animate={isOpen ? 'open' : 'closed'}
      style={{ height: 2 }}
      className="absolute inset-0 w-6 mx-auto my-auto bg-current"
    />
  )
}

interface TNavButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  // setOpen: (v: boolean) => void
}

export const NavButton = React.forwardRef<HTMLButtonElement, TNavButton>(
  function NavButton({ isOpen, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className="relative z-50 flex flex-col self-start items-center justify-center w-16 h-16 p-5 text-navy bg-mustard focus:outline-none"
        {...props}
      >
        <Filling
          key="a"
          isOpen={isOpen}
          closed={{ opacity: 1, y: -9, scale: 1 }}
          open={{ opacity: 0, y: 0, scale: 0 }}
        />
        <Filling
          key="b"
          isOpen={isOpen}
          closed={{ opacity: 1, x: 0, y: -3, rotate: 0 }}
          open={{ y: 0, rotate: -45 }}
        />
        <Filling
          key="c"
          isOpen={isOpen}
          closed={{ opacity: 1, x: 0, y: 3, rotate: 0 }}
          open={{ y: 0, rotate: 45 }}
        />
        <Filling
          key="d"
          isOpen={isOpen}
          closed={{ opacity: 1, y: 9, scale: 1 }}
          open={{ opacity: 0, y: 0, scale: 0 }}
        />
        <VisuallyHidden className="sr-only">Menu</VisuallyHidden>
      </button>
    )
  },
)
