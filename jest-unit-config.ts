import config from './jest.config';

export default {
  ...config,
  displayName: 'unit',
  testMatch: ['**/*.spec.ts'],
};
