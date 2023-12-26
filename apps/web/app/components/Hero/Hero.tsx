import * as React from 'react'

export interface THeroProps {}

export function Hero(props: THeroProps) {
  console.info(`<Hero />`, props)
  return <div>Hello</div>
}
