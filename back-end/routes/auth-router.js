const express = require('express');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const { jwtVerify } = require('../util/auth');

const router = express.Router();

// /github-auth => POST
router.post('/github-auth', authController.gitHubSignin, userController.postUserThirdParty);

// /google-auth => POST
router.post('/google-auth', authController.googleSignin, userController.postUserThirdParty);

// /auth/signup => POST
router.post('/auth/signup', userController.postUser);

// /auth/login => POST
router.post('/auth/login', userController.getUser);

// /auth/login => POST
router.post('/auth/auto-login', jwtVerify, userController.autoLogin);

exports.routes = router;
