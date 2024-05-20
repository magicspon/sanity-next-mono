import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as ToggleGroup from '.'

const meta = {
  title: 'primitives/ToggleGroup',
  component: ToggleGroup.Root,
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
} satisfies Meta<typeof ToggleGroup.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    type: 'single',
  },
  render: () => (
    <ToggleGroup.Root type="multiple">
      <ToggleGroup.Item value="bold" aria-label="Toggle bold">
        a
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Toggle italic">
        b
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Toggle underline">
        c
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  ),
}
