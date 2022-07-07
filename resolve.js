const path = require('path');

module.exports = {
  alias: {
    components: path.resolve(__dirname, './src/components'),
    contexts: path.resolve(__dirname, './src/contexts'),
    helpers: path.resolve(__dirname, './src/helpers'),
    hooks: path.resolve(__dirname, './src/hooks'),
    models: path.resolve(__dirname, './src/models'),
    styles: path.resolve(__dirname, './src/styles'),
    types: path.resolve(__dirname, './src/types'),
    utils: path.resolve(__dirname, './src/utils'),
  },
  extensions: [
    '.ts',
    '.tsx',
    '.less',
  ],
};
