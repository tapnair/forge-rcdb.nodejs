
/////////////////////////////////////////////////////////////////////
// DEVELOPMENT configuration
//
/////////////////////////////////////////////////////////////////////

/* eslint key-spacing:0 spaced-comment:0 */
const debug = require('debug')('app:config')
const path = require('path')
const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const config = {

  env: 'production',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src/client',
  dir_server : 'src/server',
  dir_test   : 'tests',
  dir_dist   : 'dist',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : ip.address(),
  server_port : process.env.PORT || 3001,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins: [
      'transform-runtime',
      //'transform-react-constant-elements',
      //'transform-react-inline-elements',
      //'transform-react-remove-prop-types'
    ],
    presets: ['es2015', 'react', 'stage-0']
  },
  compiler_devtool         : false,
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunkModules : false,
    chunks : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-redux',
    'react-router',
    'redux'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__COVERAGE__' : config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {

    if (pkg.dependencies[dep]) {
      return true
    }

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}

// ========================================================
// Environment Configuration
// ========================================================

const envConfig = {

  compiler_public_path     : '/',
  compiler_fail_on_warning : false,
  compiler_hash_type       : 'chunkhash',
  compiler_devtool         : null,
  compiler_stats           : {
    chunks       : true,
    chunkModules : true,
    colors       : true
  },

  client: {
    host: process.env.HOST_URL  || 'https://forge-rcdb.autodesk.io',
    port: process.env.HOST_PORT || 443
  },

  forge: {
    oauth: {
      clientSecret: process.env.FORGE_CLIENT_SECRET,
      clientId: process.env.FORGE_CLIENT_ID,
      scope: [
        'data:read',
        'data:create',
        'data:write',
        'bucket:read',
        'bucket:create'
      ]
    },
    viewer: {
      viewer3D: 'https://autodeskviewer.com/viewers/2.11/viewer3D.min.js',
      viewerCSS: 'https://autodeskviewer.com/viewers/2.11/style.min.css',
      threeJS: 'https://autodeskviewer.com/viewers/2.11/three.min.js'
    }
  },
  databases: [{
    type: 'mongo',
    dbhost: process.env.RCDB_DBHOST,
    dbName: process.env.RCDB_DBNAME,
    user: process.env.RCDB_USER,
    pass: process.env.RCDB_PASS,
    port: process.env.RCDB_PORT,
    collections: {
      materials: 'rcdb.materials',
      models: 'rcdb.models'
    }
  }]
}

Object.assign(config, envConfig)

module.exports = config

