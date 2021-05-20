const Message = require('../models/message');
const Channel = require('../models/channel');
const io = require('../socket.js');
const mongodb = require('mongodb');

exports.getMessagesByChannel = async (req, res, next) => {
    const channelId = req.params.id;
    let page = req.query.page;
    page = parseInt(page);

    try {
        let channel;
        let response = await Message.fetchByChannel(channelId, page);
        if (response.success) {
            channel = await Channel.fetchById(channelId);
        } else {
            // TODO throw error
        }

        if (channel.success) {
            response = { ...response, ...channel };
        } else {
            // TODO throw error
        }

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
};

exports.postMessage = async (req, res, next) => {
    const userId = req.body.userId;
    const userName = req.body.userName;
    const channelId = req.body.channelId;
    const body = req.body.body;
    const date = req.body.date;

    const newMessage = new Message(userId, userName, channelId, body, date);

    try {
        const response = await newMessage.create();
        io.getIO()
            .to(channelId)
            .emit('newMessage', { ...response });
        res.json(response);
    } catch (err) {
        console.log(err);
    }
};
