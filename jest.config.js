module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  testMatch: [
    '<rootDir>/test/**/*.test.ts',
  ],
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  moduleNameMapper: {
    '^@/(.*?)$': '<rootDir>/src/$1',
  },
  rootDir: __dirname,
}
