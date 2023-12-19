import clsx from 'clsx'
import * as React from 'react'

export interface TTruncateProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Truncate({ className, ...props }: TTruncateProps) {
  return <span className={clsx('truncate block', className)} {...props} />
}
