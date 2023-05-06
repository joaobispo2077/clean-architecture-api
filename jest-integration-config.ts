import config from './jest.config';

export default {
  ...config,
  displayName: 'integration',
  testMatch: ['**/*.test.ts'],
};
