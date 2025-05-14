import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/modules/**/*.test.ts', '**/src/utils/**/*.test.ts'],
};

export default config;
