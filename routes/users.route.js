var express = require('express');
var router = express.Router();
const auth = require('../config/auth');
const isUser = auth.isUser;

const usersController = require('../controllers/users.controller');

//GET signup
router.get('/signup', usersController.signup);

//POST signup
router.post('/signup', usersController.signupPost);

//GET login
router.get('/login', usersController.login);

//POST login
router.post('/login', usersController.loginPost);

//GET logout
router.get('/logout', usersController.logout);

//GET profile
router.get('/:username', isUser, usersController.profile);


module.exports = router;
