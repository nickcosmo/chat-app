const express = require('express');
const channelController = require('../controllers/channel-controller');
const { body } = require('express-validator');

const router = express.Router();

// /channel => POST
router.post(
    '/channel',
    body('userId').trim().notEmpty().isString(),
    body('userName').trim().notEmpty().isString(),
    body('description').trim().notEmpty().isString(),
    body('name').trim().notEmpty().isString(),
    channelController.postAddChannel
);

// TODO remove?
// /channel => GET
// router.get('/channel', channelController.getChannels);

// TODO review if needed
// /channel/:id => GET
// router.get('/channel/:id', channelController.getChannelById);

// /channel/search => POST
router.post('/channel/search', body('string').trim().notEmpty().isString(), channelController.searchChannels);

// /channel => DELETE

exports.routes = router;
