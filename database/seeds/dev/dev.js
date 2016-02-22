'use strict';

exports.seed = function(knex, Promise) {

  return knex('users').del().then(function() {
    console.log('inserting temp data');
    return knex('users').insert({username: 'Sane', clearance_level: 3, is_computer: true}).then(function(user) {
      return knex('users').insert({username: 'Oberheim', clearance_level: 0});
    }).then(function(user) {
      return knex('users').insert({username: 'Storebror', clearance_level: 0});
    });
  });
};