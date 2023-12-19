---
to: "<%= tests ? `${path}/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.spec.tsx` : null %>"
---
import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from '../<%= h.changeCase.pascalCase(name) %>.stories';

const { Primary } = composeStories(stories);

describe('<%= h.changeCase.pascalCase(name) %>', () => {
  it('renders', () => {
    render(<Primary />);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });
});
