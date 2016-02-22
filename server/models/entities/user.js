'use strict';

var bookshelf = require('../database').Bookshelf;

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var UserCollection = bookshelf.Collection.extend({
  model: User
});

module.exports.model = bookshelf.model('User', User);
module.exports.collection = bookshelf.collection('UserCollection', UserCollection);