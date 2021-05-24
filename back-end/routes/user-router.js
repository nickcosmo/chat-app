const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

// /user/channels => POST
router.post('/user/channels', userController.postAddChannelToUser);

exports.routes = router;
