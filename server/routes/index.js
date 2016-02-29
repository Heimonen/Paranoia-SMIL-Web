var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth-middleware');
var httpStatus = require('http-status');

console.log('setting up routes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Paranoia'});
});

router.get('/login', function(req, res, next) {
  res.render('log-in', {title: 'Paranoia'});
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register',
  _validateCredentials,
  function(req, res, next) {
  // TODO: insert into db and redirect to successful login page
  var email = req.body.email;
  var password = req.body.password;
  res.status(httpStatus.BAD_REQUEST).send('Ignore me, it went well!');
});

function _validateCredentials(req, res, next) {
  // TODO: check if user is already in the database
  var email = req.body.email;
  var password = req.body.password;
  if (email && password) {
    if (!_validateEmail(email)) {
      res.status(httpStatus.BAD_REQUEST).send('Please enter a valid email');
    } else {
      next();
    }
  } else {
    var noEmail = !email;
    var noPassword = !password;
    var status;
    if (noEmail && noPassword) {
      status = 'Please enter your credentials';
    } else if (noEmail) {
      status = 'Please enter an email'
    } else {
      status = 'Please enter a password'
    }
    res.status(httpStatus.BAD_REQUEST).send(status);
  }
}

function _validateEmail(email)
{
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

router.get('/forgot_password', function(req, res, next) {
  res.render('forgot-password');
});

router.post('/message', function(req, res, next) {
  console.log('Message received', req.body.message);
});

/*router.post('/login', function (req, res) {
  var post = req.body;
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user_id = johns_user_id_here;
    res.redirect('/my_secret_page');
  } else {
    res.send('Bad user/pass');
  }
});*/

router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});


module.exports = router;
