var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth-middleware');

console.log('setting up routes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Paranoia'});
});

router.get('/login', function(req, res, next) {
  console.log('whaat');
  res.render('log-in', {title: 'Paranoia'});
});

router.get('/create_user', function(req, res, next) {
  res.render('create-user');
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
