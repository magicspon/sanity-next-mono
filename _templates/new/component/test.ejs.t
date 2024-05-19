---
to: "<%= tests ? `${path}/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.spec.tsx` : null %>"
---
import React from 'react';
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react'
import { <%= h.changeCase.pascalCase(name) %> } from './<%= h.changeCase.pascalCase(name) %>'


describe('<%= h.changeCase.pascalCase(name) %> ', async () => {
  it('should render', async () => {
    const { getByTestId } = render(<<%= h.changeCase.pascalCase(name) %> />)
    expect(getByTestId('<%= h.changeCase.pascalCase(name) %>')).toBeDefined()
  })
})
