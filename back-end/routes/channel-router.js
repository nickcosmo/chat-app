const express = require('express');
const channelController = require('../controllers/channel-controller');
const { body } = require('express-validator');
const { jwtVerify } = require('../util/auth');

const router = express.Router();

// /channel => POST
router.post(
    '/channel',
    jwtVerify,
    body('userId').trim().notEmpty().isString(),
    body('userName').trim().notEmpty().isString(),
    body('description').trim().notEmpty().isString(),
    body('name').trim().notEmpty().isString(),
    channelController.postAddChannel
);

// /channel/search => POST
router.post('/channel/search', jwtVerify, body('string').trim().notEmpty().isString(), channelController.searchChannels);

exports.routes = router;
