// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./../../jest.config.ui');

module.exports = {
  ...base,
  // only run uispec tests since SSR tests do not run in jsdom environment
  testRegex: '\\.(uispec)\\.ts[x]?$',
  // since not resolved yet https://github.com/aws/aws-sdk-js-v3/issues/3964
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  transform: {
    '.+\\.(css|style|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(css)$': '<rootDir>/scripts/cssTransformer.js',
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
