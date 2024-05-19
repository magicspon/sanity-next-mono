---
to: "<%= tests ? `${path}/hooks/use${h.changeCase.pascalCase(name)}/use${h.changeCase.pascalCase(name)}.spec.tsx` : null %>"
---
import { expect, it, describe } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { use<%= h.changeCase.pascalCase(name) %> } from '.';

describe('use<%= h.changeCase.pascalCase(name) %>', () => {
  it('renders', () => {
		const { result } = renderHook(() => use<%= h.changeCase.pascalCase(name) %>({}))

		expect(result).toBeDefined()
  });
});
