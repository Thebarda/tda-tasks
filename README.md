# tasks-list



## Project Setup

```sh
pnpm i --frozen-lockfile
```

### Run storybook

```sh
pnpm storybook
```

### Run storybook tests coverage

Note: Storybook server must be running. Another note about the code coverage storybook addon, there is an issue about *.vue files: https://github.com/storybookjs/addon-coverage/issues/38

```sh
pnpm test-storybook:coverage
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile, Minify for Production ans serve

```sh
pnpm build
pnpm serve
```
