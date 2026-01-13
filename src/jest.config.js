module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!uuid)/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFiles: ['<rootDir>/src/__tests__/setupEnv.ts'],
  moduleNameMapper: {
    '^uuid$': '<rootDir>/src/__mocks__/uuid.ts',
  },
};
