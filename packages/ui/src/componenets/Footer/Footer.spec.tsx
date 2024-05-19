import React from 'react'
import { expect, it, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer ', async () => {
  it('should render', async () => {
    const { getByTestId } = render(<Footer />)
    expect(getByTestId('Footer')).toBeDefined()
  })
})
