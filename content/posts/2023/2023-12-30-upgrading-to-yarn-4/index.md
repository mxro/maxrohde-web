---
title: 'Upgrading to Yarn 4'
publish: true
coverImage: 'package-1511683_1920.jpg'
id: 'upgrading-to-yarn-4'
blog: 'maxrohde.com'
date: 2023-12-30
summary: My experiences upgrading from Yarn 3 to Yarn 4 in a large codebase.
authors:
  - max
tags:
  - 'javascript'
  - 'yarn'
  - 'npm'
categories:
  - 'code'
---


I maintain a set of templates and a starter project builder for fullstack projects: [Goldstack](https://goldstack.party/). This project makes heavy use of Yarn 3 features, specifically for workspace management.

I realised that a new version of Yarn, [Yarn 4](https://yarnpkg.com/blog/release/4.0) was released recently, so I wanted to explore if I can easily update this project from Yarn 3 to Yarn 4.

This project contains more than 70 workspaces (including sub-workspaces) and uses a number of frameworks and libraries, such as:

- TypeScript
- React
- AWS SDK
- Next.js
- ESLint
- and many more

So I think it can be a good testing ground for upgrading to Yarn 4.

I [completed the upgrade](https://github.com/goldstack/goldstack/pull/349) and released this in version [0.5.0](https://github.com/goldstack/goldstack/releases/tag/v0.5.0) of Goldstack.

Overall it took me around 3 hours to perform the upgrade. Here an overview of what I needed to do:

## Updating Yarn

First, Yarn needed to be updated to version 4 using the following commands:

```
yarn set version stable
yarn install
```

Note that this may upgrade to a later version than Yarn 4 if you run this at a future point in time.

## Upgrading Node version

Yarn 4 is not compatible with earlier versions of Node. Specifically Node 16 is no longer supported.

I needed to ensure that all GitHub actions provide an environment that runs in Node 18:

```yml
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
```

## Fixing CLI commands

There was an incompatible change included in Yarn 4 with respect to the [foreach](https://yarnpkg.com/cli/workspaces/foreach) command. Previously it was possible to run a command as follows:

```bash
yarn foreach run clean
```

However, now Yarn requires to add a qualifier. Specifically one of the following:

| Command  | Description  |
|---|---|
|`-A,--all` |Run the command on all workspaces of a project|
|`-R,--recursive` |Run the command on the current workspace and all of its recursive dependencies|
|`-W,--worktree` |Run the command on all workspaces of the current worktree|

I provided the `-W` or `--worktree` option for all occurrences where I previously used `foreach`. I usually just wanted to run a command for all packages for a workspace - but not including recursive dependencies or all packages in the whole project (what `-A` will do).

A worktree is defined in the Yarn documentation as:

> [...] a _worktree_ is the name given to workspaces that list their own child workspaces.

I would say overall it was a fairly easy process to upgrade to Yarn 4. Next from here I would like to explore:

- Yarn now supports having its binary managed through [corepack](https://nodejs.org/dist/latest/docs/api/corepack.html). My template currently still uses [`yarnPath`](https://github.com/goldstack/goldstack/blob/c02bc944b27aaed725db01139e3122e78442b158/.yarnrc.yml#L27).
- Yarn supports a hybrid mode that allows managing package dependencies using Yarn Plug'n'play and the 'node linker' (that requires the `node_modules`) folder alongside each other. I want to explore whether this can be used to create a [mobile template based on Expo](https://github.com/goldstack/goldstack/issues/299)

