[![Units Tests](https://github.com/magicspon/sanity-next-mono/actions/workflows/test.yml/badge.svg)](https://github.com/magicspon/sanity-next-mono/actions/workflows/test.yml)
[![Lint & Typecheck](https://github.com/magicspon/sanity-next-mono/actions/workflows/lint.yml/badge.svg)](https://github.com/magicspon/sanity-next-mono/actions/workflows/lint.yml)
[![Release](https://github.com/magicspon/sanity-next-mono/actions/workflows/release.yml/badge.svg)](https://github.com/magicspon/sanity-next-mono/actions/workflows/release.yml)

# Sanity / Next

## Quick start

```bash
pnpm install
pnpm dev
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
- Changesets
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

## Contributing

All commit messages must adhere the gitmoji commitlint conventions

```base
:sparkles: feat(changelog): support chinese title

:bug: fix(config): fix a subject bug

:memo: docs: update README.md

:bulb: docs(plugin): update comments
```

[More emoji here](https://gitmoji.dev/)

### Sanity

Includes live preview, singletons, nested documents [via Sanity page tree](https://github.com/Q42/sanity-plugin-page-tree)
