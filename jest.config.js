module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov'],
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  testMatch: [
    '<rootDir>/tests/**/*.spec.ts',
  ],
  transform: {
    '^.+\\.tsx?$': '@sucrase/jest-plugin',
  },
  moduleNameMapper: {
    '^@/(.*?)$': '<rootDir>/src/$1',
  },
  rootDir: __dirname,
}
