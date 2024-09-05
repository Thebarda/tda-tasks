# tasks-list

I've built this tasks list app in order to handle simple tasks with different statuses (To do, In progress, Completed).

You can create a task, update, delete it and update the status.

Finally, you can search across tasks using the name or the description and filter them with the status.

Tasks are stored in local storage.

You can only access to the tasks page by having a valid account.

> Note: I've tried to store them in a protected database using Supabase but it seems there is an issue my policy rules.

## Requirements

- NodeJS >= 20
- Pnpm >= 9
- A valid email

## Getting started

```sh
pnpm i --frozen-lockfile
pnpm build && pnpm serve
```

- Open a new tab to http://localhost:3000
- Click on the Sign in button
- Enter a valid email
- Enter a valid password
- Click on the Sign up button
- Create your first task by clicking on Add task
- Fullfill the form
- Click on Save

### Project Setup

```sh
pnpm i --frozen-lockfile
```

### Run storybook

```sh
pnpm storybook
```

### Run storybook tests coverage

> Note: Storybook server must be running. Another note about the code coverage storybook addon: there is an issue about *.vue files that are not covered: https://github.com/storybookjs/addon-coverage/issues/38

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

### Chromatic

```sh
pnpm chromatic
```