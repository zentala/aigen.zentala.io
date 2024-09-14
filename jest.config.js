module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
      '^.+\\.vue$': 'vue-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
      '**/tests/unit/**/*.spec.[jt]s?(x)',
      '**/__tests__/*.[jt]s?(x)'
    ],
    testEnvironment: 'jsdom'
  };