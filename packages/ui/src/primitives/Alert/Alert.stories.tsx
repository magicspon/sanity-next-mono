import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as Alert from '.'

const meta = {
  title: 'primitives/Alert',
  component: Alert.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Alert.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
  render: () => (
    <Alert.Root>
      <Alert.Title>Hello</Alert.Title>
      <Alert.Description>
        <p>Ah chucks</p>
      </Alert.Description>
    </Alert.Root>
  ),
}
