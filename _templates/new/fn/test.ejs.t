---
to: "<%= tests ? `${path}/${name}.spec.tsx` : null %>"
---
import { expect, it, describe, vi } from 'vitest'
import * as Fn from './<%= name %>'

describe('<%= name %>', async () => {
  it('should be invoked', async () => {
    const getLegsSpy = vi.spyOn(Fn, '<%= name %>')
    Fn.<%= name %>({})
    expect(getLegsSpy).toHaveBeenCalled()
  })
})
