var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { headTitle: 'Home' });
});

//Login with Facebook
router.get('/auth/fb', passport.authenticate('facebook',{scope: ['email']}));

router.get('/auth/fb/cb', passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/users/login' }));


//Login with google
router.get('/auth/gg', passport.authenticate('google',{scope: ['profile', 'email']}));

router.get('/auth/gg/cb', passport.authenticate('google', { successRedirect : '/', failureRedirect: '/users/login' }));


module.exports = router;
