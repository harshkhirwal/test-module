const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'test-module'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test-module-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'test-module'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test-module-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'test-module'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/test-module-production'
  }
};

module.exports = config[env];
