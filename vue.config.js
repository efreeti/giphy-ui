const path = require('path');
const glob = require('glob');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: glob.sync('node_modules/@material')
            .map(d => path.join(__dirname, d)),
        }
      },
    },
  },
};
