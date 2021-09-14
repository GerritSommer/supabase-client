/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(env) {
  return {
    clientAllowedKeys: [ 'SUPABASE_BASE_URL', 'SUPABASE_KEY' ],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), `.env-${env}`)
  }
};
