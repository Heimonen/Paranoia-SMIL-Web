var express = require('express');
var router = express.Router();

console.log('setting up routes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Paranoia'});
});


router.post('/message', function(req, res, next) {
  console.log('Message received', req.body.message);
});

module.exports = router;
