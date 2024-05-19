---
to:  <%= path %>/<%= h.changeCase.pascalCase(name)  %>/<%= h.changeCase.pascalCase(name)  %>.tsx
---
import * as React from 'react'
<% if(variants){ -%>
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva('', {
  variants: {
    variant: {
      default: '',
      secondary: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'default',
  },
})

export type <%= h.changeCase.pascalCase(name)  %>Variants = VariantProps<typeof variants>
<% } -%>

type TElementProps = React.ComponentProps<'div'>

<% if(variants){ -%>
export type T<%= h.changeCase.pascalCase(name) %>Props = TElementProps & <%= h.changeCase.pascalCase(name)  %>Variants & {
  //
}
<% } else { -%>
export type T<%= h.changeCase.pascalCase(name) %>Props = TElementProps & {
  //
}
<% } -%>

<% if(forwardRef){ -%>
export const <%= h.changeCase.pascalCase(name) %> = React.forwardRef<React.ElementRef<'div'>, T<%= h.changeCase.pascalCase(name) %>Props>(
	function <%= h.changeCase.pascalCase(name) %>(<%= variants ? '{className, variant, ...props}' : 'props' %>, ref) {
		console.info(`<<%= h.changeCase.pascalCase(name) %> />`, props)
		return <div data-testid="<%= h.changeCase.pascalCase(name) %>" ref={ref} <%= variants ? 'className={variants({className, variant})}' : '' %> {...props} />
	},
)
<% } else { -%>
export function <%= h.changeCase.pascalCase(name) %>(<%= variants ? '{className, variant, ...props}' : 'props' %>: T<%= h.changeCase.pascalCase(name) %>Props) {
	console.info(`<<%= h.changeCase.pascalCase(name) %> />`, props)
  return (
    <div data-testid="<%= h.changeCase.pascalCase(name) %>" <%= variants ? 'className={variants({className, variant})}' : '' %>  {...props} />
  )
}
<% } -%>




