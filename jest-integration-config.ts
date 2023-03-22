const config = require('./jest.config');

export default {
  ...config,
  testMatch: ['**/*.test.ts'],
};
