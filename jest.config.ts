import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globals: {
    tsConfig: "tsconfig.test.json",
  },
  modulePathIgnorePatterns: [
    "node_modules"
  ]
};

export default config;