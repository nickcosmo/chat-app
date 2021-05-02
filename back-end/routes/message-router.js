const express = require('express');
const messageController = require('../controllers/message-controller');

const router = express.Router();

// /message/id => GET
router.get('/message/:id', messageController.getMessagesByChannel);

// /message => POST
router.post('/message', messageController.postMessage);

exports.routes = router;
