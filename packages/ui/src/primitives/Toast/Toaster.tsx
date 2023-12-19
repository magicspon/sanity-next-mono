'use client'

import * as Toast from './Toast'
import { useToast } from './useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <Toast.Provider>
      {toasts.map(function ({ id, title, text, action, ...props }) {
        return (
          <Toast.Root key={id} {...props}>
            <div className="grid gap-1">
              {title && <Toast.Title>{title}</Toast.Title>}
              {text && <Toast.Description>{text}</Toast.Description>}
            </div>
            {action}
            <Toast.Close />
          </Toast.Root>
        )
      })}
      <Toast.Viewport />
    </Toast.Provider>
  )
}
