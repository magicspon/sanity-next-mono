import { HeroFragment } from 'cms/queries/fragments/hero.fragment'
import * as React from 'react'
import { Debug } from '~/utils/Debug'

export interface THeroProps {}

export function Hero(props: HeroFragment) {
  return (
    <div>
      <Debug render {...props} />
    </div>
  )
}
