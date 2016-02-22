'use strict';

let tables = {
  users: function(table) {
    table.increments().primary();								    // PRIMARY KEY
    table.string('username').notNullable();
    table.integer('clearance_level').notNullable();
    table.boolean('is_computer').defaultTo(false);
  }
};

let relations = {

};

exports.up = function(knex, Promise) {
  return new Promise(function(resolve, reject) {

    let promises = [];
    // Create tables
    for (let tableName in tables) {
      promises.push(knex.schema.createTableIfNotExists(tableName, tables[tableName]));
    }
    // Alter tables to add relations, making sure to do this after all tables have been created
    for (let relationName in relations) {
      promises.push(knex.schema.table(relationName, relations[relationName]()));
    }
    Promise.all(promises).then(resolve).catch(reject);
  });
};

exports.down = function(knex, Promise) {
  return new Promise(function(resolve, reject) {
    let promises = [];
    let tableString = '';
    for (let tableName in tables) {
      tableString += tableName + ','
    }
    tableString = tableString.substr(0, tableString.length - 1);
    promises.push(knex.raw('DROP TABLE IF EXISTS ' + tableString + ' CASCADE'));
    Promise.all(promises).then(resolve).catch(reject);
  });
};