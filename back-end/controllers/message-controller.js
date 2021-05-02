const Message = require('../models/message');
const mongodb = require('mongodb');

exports.getMessagesByChannel = async (req, res, next) => {
    const channelId = req.params.id;
    try {
        await Message.fetchByChannel(channelId);
    } catch (err) {
        console.log(err);
    }
};

exports.postMessage = async (req, res, next) => {
    const userId = req.body.userId;
    const channelId = req.body.channelId;
    const body = req.body.body;
    const date = req.body.date;

    const newMessage = new Message(userId, channelId, body, date);

    try {
        const response = await newMessage.create();
        res.json(response);
    } catch (err) {
        console.log(err);
    }
};
