# Sanity / Next

## Quick start

```bash
yarn install
yarn dev
```

## Features

- Sanity
- Typescript
- Tailwind
- Nextjs
- Storybook
- Playwright
- Hygen
- Eslint
- Prettier
- Commitlint
- Lintstaged
- Github Actions

## About

It uses [Turborepo](https://turborepo.org/) and contains:

```
apps
  └─ cms
      ├─ sanity.io
  └─ web
      ├─ nextjs
packages
 └─ config
     └─ eslint eslint config
     └─ tailwindcss tailwindcss config
     └─ tsconfig config
 └─ ui
     └─ design system with storybook
 └─ utils
     └─ utility functions
```

### Sanity

Includes live preview, singletons, nested documents [via Sanity page tree](https://github.com/Q42/sanity-plugin-page-tree)
