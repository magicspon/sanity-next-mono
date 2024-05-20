import * as Tabs from '.'
import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../Text'

const meta = {
  title: 'primitives/Tabs',
  component: Tabs.Root,
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
} satisfies Meta<typeof Tabs.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    // type: 'Tabs',
  },
  render: () => (
    <Tabs.Root>
      <Tabs.List className="grid w-full grid-cols-2">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <Text>account</Text>
      </Tabs.Content>
      <Tabs.Content value="password">
        <Text>password</Text>
      </Tabs.Content>
    </Tabs.Root>
  ),
}
