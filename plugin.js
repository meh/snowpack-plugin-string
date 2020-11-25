const { promises: fs } = require('fs');
const pkg = require('./package.json');

module.exports = function plugin(snowpackConfig, options) {
  return {
    name: pkg.name,

    resolve: {
      input: options.input || ['.txt', '.dot', '.conf'],
      output: ['.js'],
    },

    async load({ filePath }) {
      const content = await fs.readFile(filePath, { encoding: 'utf-8' });

      return {
        '.js': `export default ${JSON.stringify(content)};`,
      };
    },
  };
}

