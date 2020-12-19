module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ['<rootDir>/__tests__/*.spec.(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
