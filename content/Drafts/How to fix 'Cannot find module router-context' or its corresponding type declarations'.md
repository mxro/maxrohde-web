---
title: "How to fix Next.js error: Cannot find module 'next/dist/shared/lib/router-context' or its corresponding type declarations."
publish: true
coverImage: 'pexels-danny-meneses-943096.jpg'
id: 'next-js-error-cannot-find-module-router-context'
blog: 'maxrohde.com'
date: 2023-12-31
summary: Diagnose and fix the 'Cannot find module' problem after Next.js upgrade.
authors:
  - max
tags:
  - 'nextjs'
  - 'javascript'
  - 'typescript'
categories:
  - 'code'
---


I just upgraded Next.js in my [Next.js templates](https://goldstack.party/templates/nextjs) from 13.1.1 to 13.5.1 and after upgrading it I encountered the following TypeScript compilation error:

```
Cannot find module 'next/dist/shared/lib/router-context' or its corresponding type declarations.
```

The offending code in my case was the following use of `RouterContext` in the test [`index.uispec.tsx`](https://github.com/goldstack/goldstack/blob/bc53c1de469182c0b9d6e5c019e532548a91f4fb/workspaces/apps/packages/goldstack-home/src/__tests__/index.uispec.tsx#L3):

```jsx
import { RouterContext } from 'next/dist/shared/lib/router-context';

// ...

 render(
    <ThemeProviderPatched theme={theme}>
      <RouterContext.Provider value={{ ...mockRouter }}>
        <Front />
      </RouterContext.Provider>
    </ThemeProviderPatched>
  );
```

The same issue seems to have been encountered in a number of other projects, eg. [#1](https://github.com/storybookjs/storybook/issues/24234) and [#2](https://github.com/vercel/next.js/issues/36234).

The fix for this is thankfully very simple. We only need to [update the import](https://github.com/storybookjs/storybook/issues/24234#issuecomment-1726353377) to:

```jsx
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
```