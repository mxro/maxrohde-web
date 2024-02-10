---
title: 'Solving Jest Unexpected Token error uuid package'
publish: true
coverImage: 'screenshot.png'
id: 'solving-jest-unexpected-token-error-uuid-package'
blog: 'maxrohde.com'
date: 2024-02-10
summary: 
authors:
  - max
tags:
  - 'javascript'
  - 'jest'
  - 'uuid'
categories:
  - 'code'
---

## Problem

When trying to run a [Jest](https://jestjs.io/) test, you encounter the following error related to the `uuid` package:

```
Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

...

 Details:

    \uuid-npm-8.3.2-eca0baba53-5575a8a75c.zip\node_modules\uuid\dist\esm-browser\index.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){export { default as v1 } from './v1.js';
                                                                                      ^^^^^^

    SyntaxError: Unexpected token 'export'

```

You may encounter this when using the AWS JavaScript SDK or the Google Cloud Platform SDKs as well as other libraries.
## Solutions

There are a number of solutions to this problem, and the one that works for you, will depend on the specific for your project:

### Solution 1: Upgrade to uuid v9

If you can upgrade your `uuid` dependency to version `9.0.0` and Jest to version 28+, the issue will be resolved as per [uuid#451](https://github.com/uuidjs/uuid/issues/451).

### Solution 2: Provide a moduleNameMapper

If the above is not possible for you, you can provide a custom `moduleNameMapper` in your `jest.config.js` in either of the following two ways:

```javascript
module.exports = {
	  moduleNameMapper: {
	    "^uuid$": require.resolve('uuid'),
	  }
}
```

or

```javascript
module.exports = {
	  moduleNameMapper: {
	    '^uuid$': '<rootDir>/node_modules/uuid/wrapper.mjs'
	  }
}
```

see [uuid#678](https://github.com/uuidjs/uuid/issues/678#issuecomment-1456972933) and [uuid#451](https://github.com/uuidjs/uuid/issues/451#issuecomment-1347492222)

### Solution 3: Provide a custom resolver

When I encountered this error, both solution 1 and 2 did not work to me and I had to resolve to provide a custom resolver as proposed in [accessibility-insights-web#5421](https://github.com/microsoft/accessibility-insights-web/pull/5421/commits/9ad4e618019298d82732d49d00aafb846fb6bac7):

Create `scripts/resolver.js`:

```
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: (pkg) => {
      // This is a workaround for https://github.com/uuidjs/uuid/pull/616
      //
      // jest-environment-jsdom 28+ tries to use browser exports instead of default exports,
      // but uuid only offers an ESM browser export and not a CommonJS one. Jest does not yet
      // support ESM modules natively, so this causes a Jest error related to trying to parse
      // "export" syntax.
      //
      // This workaround prevents Jest from considering uuid's module-based exports at all;
      // it falls back to uuid's CommonJS+node "main" property.
      //
      // Once we're able to migrate our Jest config to ESM and a browser crypto
      // implementation is available for the browser+ESM version of uuid to use (eg, via
      // https://github.com/jsdom/jsdom/pull/3352 or a similar polyfill), this can go away.
      if (pkg.name === 'uuid') {
        delete pkg['exports'];
        delete pkg['module'];
      }
      return pkg;
    },
  });
};
```

And then the jest.config:

```javascript
module.exports = {
  resolver: `${__dirname}/scripts/resolver.js`,
}
```

