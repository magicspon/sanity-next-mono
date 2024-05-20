import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as Accordion from '.'

const meta = {
  title: 'primitives/Accordion',
  component: Accordion.Root,
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
} satisfies Meta<typeof Accordion.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'single',
  },
  render: () => (
    <Accordion.Root type="single">
      <Accordion.Item value="a">
        <Accordion.Trigger>Item</Accordion.Trigger>
        <Accordion.Content>Hello</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Trigger>Item</Accordion.Trigger>
        <Accordion.Content>Hello</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}
