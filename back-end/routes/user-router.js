const express = require('express');
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');

const router = express.Router();

// /user/channels => POST
router.post(
    '/user/channels',
    body('channelId').trim().notEmpty().isString(),
    body('userId').trim().notEmpty().isString(),
    body('userName').trim().notEmpty().isString(),
    body('channelName').trim().notEmpty().isString(),
    userController.postAddChannelToUser
);

exports.routes = router;
