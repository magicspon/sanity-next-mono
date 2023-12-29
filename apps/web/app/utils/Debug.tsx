'use client'

export function Debug({
  render,
  ...props
}: {
  render?: boolean
  [k: string]: any
}) {
  console.log('[Debug]', props)
  if (!render) return null

  return <pre>{JSON.stringify(props, null, 2)}</pre>
}
