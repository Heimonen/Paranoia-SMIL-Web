'use strict';

var _ = require('lodash');
var knexfile = require('../../knexfile');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var config;
let doMigrations = false;

switch (process.env.NODE_ENV) {
  case 'production':
    config = knexfile.production;
    break;
  default:
    config = knexfile.development;
}

var knex = require('knex')(config);

var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');

Bookshelf.Model.prototype.parse = function (attrs) {
  return _.reduce(attrs, function (memo, val, key) {
    memo[_.camelCase(key)] = val;
    return memo;
  }, {});
};

Bookshelf.Model.prototype.format = function (attrs) {
  return _.reduce(attrs, function (result, val, key) {
    result[_.snakeCase(key)] = val;
    return result;
  }, {});
};

module.exports = function () {

  function initialize(resolve, reject) {
    console.log('Connecting to ' + config.connection);
    // Create tables if they don't exist
    if (process.env.NODE_ENV === 'development' && doMigrations) {
      knex.migrate.rollback().then(function () {
        console.log('Rollback done');
        return knex.migrate.latest();
      }).then(function () {
        console.log('Migration done');
        return knex.seed.run();
      }).then(function () {
        console.log('DB running');
        resolve('Seed done');
      }).catch(function (err) {
        reject(err);
      });
    } else {
      resolve('No migrations done. Change migrations flag in order to run them.');
    }
  }

  let promise = new Promise(function (resolve, reject) {
    module.exports.Bookshelf = Bookshelf;
    module.exports.eventEmitter = eventEmitter;
    initialize(resolve, reject);
  });

  // Add returned functions here
  return {
    promise
  };
};

//# sourceMappingURL=database-compiled.js.map