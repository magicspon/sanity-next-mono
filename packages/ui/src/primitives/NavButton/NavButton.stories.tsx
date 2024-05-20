import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { NavButton } from '.'

const meta = {
  title: 'primitives/NavButton',
  component: NavButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof NavButton>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: (args) => {
    return <NavButton {...args} />
  },

  args: {
    isOpen: true,
  },
}

export const Closed: Story = {
  render: (args) => {
    return <NavButton {...args} />
  },

  args: {
    isOpen: false,
  },
}
