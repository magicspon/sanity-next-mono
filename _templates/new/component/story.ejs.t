---
to: "<%= storybook ? `${path}/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.stories.tsx` : null %>"
---
import type { Meta, StoryObj } from '@storybook/react'
import { <%= h.changeCase.pascalCase(name) %> } from '.'

const meta = {
	title: 'Example/<%= h.changeCase.pascalCase(name) %>',
	component: <%= h.changeCase.pascalCase(name) %>,
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
} satisfies Meta<typeof <%= h.changeCase.pascalCase(name) %>>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		<% if(variants){ -%>
		variant: "default"
		<% } -%>
	},
}
