const Message = require('../models/message');
const Channel = require('../models/channel');
const io = require('../socket.js');
const { validationResult } = require('express-validator');

exports.getMessagesByChannel = async (req, res, next) => {
    try {
        const check = validationResult(req);
        if (!check.isEmpty()) {
            const err = new Error(check.errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        const channelId = req.params.id;
        let page = req.query.page;
        page = parseInt(page);

        let channel;
        let response = await Message.fetchByChannel(channelId, page);
        if (!response.success) {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }

        channel = await Channel.fetchById(channelId);
        if (!channel.success) {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
        response = { ...response, ...channel };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.postMessage = async (req, res, next) => {
    try {
        const check = validationResult(req);
        if (!check.isEmpty()) {
            const err = new Error(check.errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        const userId = req.body.userId;
        const userName = req.body.userName;
        const channelId = req.body.channelId;
        const body = req.body.body;
        const date = req.body.date;

        const newMessage = new Message(userId, userName, channelId, body, date);

        const response = await newMessage.create();
        if (!response.success) {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
        io.getIO()
            .to(channelId)
            .emit('newMessage', { ...response });
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
