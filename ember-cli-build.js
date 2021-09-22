'use strict';

const EmberApp        = require('ember-cli/lib/broccoli/ember-app');
const ENV             = EmberApp.env();
const isProductionEnv = ENV === 'production';
const isTestEnv       = ENV === 'test';
const autoprefixer    = require('autoprefixer');
const tailwind        = require('tailwindcss');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {

    tests:   isTestEnv,
    hinting: isTestEnv,
    // hinting: false,

    fingerprint: {
      enabled:    isProductionEnv
    },

    minifyJS: {
      enabled: isProductionEnv
    },

    minifyCSS: {
      enabled: isProductionEnv
    },

    autoImport: {
      exclude: ['qunit']
    },

    'ember-cli-babel': {
      comments:        false,
      includePolyfill: isProductionEnv,
    },
    'ember-cli-terser': {
      enabled: (isProductionEnv),
    },

    sourcemaps: {
      enabled: !isProductionEnv,
      extensions: ['js']
    },

    babel: {
      sourceMaps: 'inline',
      plugins: [ require.resolve('ember-auto-import/babel-plugin') ]
    },

    // See https://github.com/raytiley/tailwind-ember-example
    postcssOptions: {
      compile: {
        plugins: [
          {
            module: autoprefixer,
            options: {}
          },
          {
            module: tailwind,
            options: {
              config: './config/tailwindcss-config.js'
            }
          }
        ],
      }
    },

    svgJar: {
      strategy: 'inline',
      sourceDirs: [ 'public/assets/svg' ],
      stripPath: true,
      optimizer: {
        plugins: [
          { removeXMLNS:                    true },
          { inlineStyles:                   true },
          { minifyStyles:                   false },
          { prefixIds:                      false },
          { cleanupListOfValues:            true },
          { removeViewBox:                  false },
          { moveElemsAttrsToGroup:          false },
          { moveGroupAttrsToElems:          false },
          { convertTransform:               false },
          { sortAttrs:                      true },
          { removeDimensions:               false },
          { removeElementsByAttr:           false },
          { removeStyleElement:             true },
          { removeScriptElement:            true },
          { addAttributesToSVGElement:      false }
        ]
      }
    }

  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
