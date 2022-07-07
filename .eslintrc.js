const resolve = require('./resolve');

module.exports = {
  extends: [
    '@qt/eslint-config-frontend/typescript/prettier',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve,
        }
      }
    },
  }
};
