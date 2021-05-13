const express = require('express');
const channelController = require('../controllers/channel-controller');

const router = express.Router();

// /channel => POST
router.post('/channel', channelController.postAddChannel);

// /channel => GET
router.get('/channel', channelController.getChannels);

// /channel/:id => GET
router.get('/channel/:id', channelController.getChannelById);

// /channel/search => POST
router.post('/channel/search', channelController.searchChannels);

// /channel => DELETE

exports.routes = router;
