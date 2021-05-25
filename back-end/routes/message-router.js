const express = require('express');
const messageController = require('../controllers/message-controller');
const { body, param } = require('express-validator');

const router = express.Router();

// /message/id => GET
router.get(
    '/message/:id',
    param('id').trim().notEmpty().isString(),
    messageController.getMessagesByChannel
);

// /message => POST
router.post(
    '/message',
    body('channelId').trim().notEmpty().isString(),
    body('body').trim().notEmpty().isString(),
    body('userId').trim().notEmpty().isString(),
    body('userName').trim().notEmpty().isString(),
    body('date').trim().notEmpty().isString(),
    messageController.postMessage
);

exports.routes = router;
