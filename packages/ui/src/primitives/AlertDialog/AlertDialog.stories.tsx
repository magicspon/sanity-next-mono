import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as AlertDialog from '.'

const meta = {
  title: 'primitives/AlertDialog',
  component: AlertDialog.Root,
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
} satisfies Meta<typeof AlertDialog.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
  render: () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>Item</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Item</AlertDialog.Title>
        <AlertDialog.Description>Hello</AlertDialog.Description>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action>Action</AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}
