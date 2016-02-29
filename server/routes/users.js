var express = require('express');
var router = express.Router();
var Users = require('../models/entities/user').collection;
var auth = require('../middleware/auth-middleware');

/* GET users listing. */
router.get('/',
  auth,
  function(req, res, next) {
  new Users().fetch().then(function(users) {
    res.render('users', {users: users.toJSON()});
  }).catch(function(err) {
    res.render('error', {message: 'Something went wrong', error: err});
  });
});

module.exports = router;
