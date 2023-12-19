import * as React from 'react'

export function VisuallyHidden(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className="sr-only" {...props} />
}
