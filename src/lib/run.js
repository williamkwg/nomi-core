var babel = require('babel-register');
require("regenerator-runtime/runtime");
(0, babel || babel.default)({
  ignore(filename) {
      if (filename.indexOf('node_modules/nomi-') >= 0 || filename.indexOf('nomi-core/src/') >=0 || filename.indexOf('nomi-core/index') > 0) {
          return false;
      }
      return true;
  },
  presets: [ 'es2015', 'stage-0' ],
  plugins: [
      [
           'transform-runtime', 
            {
                "polyfill": true,
                "regenerator": true
            }
      ],
      'transform-es2015-modules-commonjs',
      'transform-async-to-generator',
      'transform-decorators-legacy',
      [
          'babel-plugin-transform-require-ignore',
          {
              extensions: [ '.scss', '.css', '.less' ]
          }
      ]
  ]
});
