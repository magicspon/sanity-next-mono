'use client'
import { client } from 'cms/lib/client'
// import { suspend } from 'suspend-react'
import { LiveQueryProvider } from '@sanity/preview-kit'

// suspend-react cache is global, so we use a unique key to avoid collisions
// const UniqueKey = Symbol('lib/sanity.client')

export function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token?: string
}) {
  // const { client } = suspend(() => import('cms/lib/client'), [UniqueKey])
  if (!token) throw new TypeError('Missing token')
  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}
