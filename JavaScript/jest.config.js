// jest.config.js
module.exports = {
  // The root directory that Jest should scan for tests and modules within.
  // Defaults to the directory of the package.json or where Jest is run.
  // Explicitly setting to '.' means the directory where this jest.config.js is located.
  rootDir: '.',

  // A list of paths to directories that Jest should use to search for files in.
  // '<rootDir>' is a special token that Jest replaces with the rootDir value.
  roots: ['<rootDir>/tests'],

  // The test environment that will be used for testing.
  // 'node' is suitable for testing Node.js applications (backend/logic).
  // 'jsdom' would be used for browser-like environment testing.
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files.
  // This default pattern finds files in __tests__ folders OR files with .test.js/ts or .spec.js/ts extensions.
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  // An array of regexp pattern strings that are matched against all test paths before executing the test.
  // If the test path matches any of the patterns, it will be skipped.
  // '/node_modules/' is a common exclusion.
  testPathIgnorePatterns: ['/node_modules/'],

  // Indicates whether each individual test should be reported during the run.
  verbose: true,
};
