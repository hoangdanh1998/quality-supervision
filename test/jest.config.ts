import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts',
  verbose: true,
  modulePathIgnorePatterns: [
    "node_modules/(?!(supertest)/)"
  ]
};

export default config;