const express = require('express');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');

const router = express.Router();

// /github-auth => POST
router.post('/github-auth', authController.gitHubSignin, userController.userAuthThirdParty);

// /google-auth => POST
router.post('/google-auth', authController.googleSignin, userController.userAuthThirdParty);

// /auth/signup => POST
router.post(
    '/auth/signup',
    body('name').trim().notEmpty().isString(),
    body('email').trim().notEmpty().isString(),
    body('password').trim().notEmpty().isString(),
    userController.postUser
);

// /auth/login => POST
router.post('/auth/login', body('email').trim().notEmpty().isString(), body('password').trim().notEmpty().isString(), userController.getUser);

// /auth/logout => GET
router.get('/auth/logout', userController.logOut);

// TODO auto login - review if needed
// /auth/login => POST
// router.post('/auth/auto-login', jwtVerify, userController.autoLogin);

exports.routes = router;
