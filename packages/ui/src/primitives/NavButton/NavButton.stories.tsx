import * as React from 'react'
import { Meta } from '@storybook/react'

import { NavButton } from '.'

export default {
  component: NavButton,
  title: 'global/NavButton',
} as Meta<typeof NavButton>

type Args = React.ComponentProps<typeof NavButton>

export const Open = {
  render: (args: Args) => {
    return <NavButton {...args} />
  },

  args: {
    isOpen: true,
  },
}

export const Closed = {
  render: (args: Args) => {
    return <NavButton {...args} />
  },

  args: {
    isOpen: false,
  },
}
