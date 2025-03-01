import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Убирает .js при импорте в Jest
  },
  testPathIgnorePatterns: ['<rootDir>/tests/cache/']
};

export default config;