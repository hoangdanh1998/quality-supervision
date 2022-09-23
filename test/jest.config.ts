import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts',
  verbose: true,
  modulePathIgnorePatterns: [
    "node_modules/(?!(supertest)/)"
  ],
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ]
};

export default config;