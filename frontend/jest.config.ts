import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.ts',
    '!<rootDir>/coverage/**',
    '!<rootDir>/redux/**',
    '!**/index.ts',   
    '!**/*Config.ts'
  ],
  coverageReporters: ['html', 'lcov', 'text-summary'],
};

export default config;