const express = require('express');
const authController = require('../controllers/auth-controller');

const router = express.Router();

// /github-aut => POST
router.post('/github-auth', authController.gitHubSignin);

// /google-auth => POST
router.post('/google-auth', authController.googleSignin);

exports.routes = router;
