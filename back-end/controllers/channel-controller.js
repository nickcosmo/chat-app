const Channel = require('../models/channel');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.postAddChannel = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        const name = req.body.name;
        const description = req.body.description;
        const userId = req.body.userId;
        const members = [{ name: req.body.userName, _id: req.body.userId }];

        const newChannel = new Channel(name, description, userId, members);
        const response = await newChannel.create();
        if (response.success) {
            const userResponse = await User.addChannel(userId, response.channel._id, response.channel.name);
            if (userResponse.success) {
                return res.status(200).json(response);
            } else {
                const err = new Error(response.message);
                err.statusCode = response.statusCode;
                throw err;
            }
        } else {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.searchChannels = async (req, res, next) => {
    try {
        const check = validationResult(req);
        if (!check.isEmpty()) {
            const err = new Error(check.errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        const string = req.body.string;

        const response = await Channel.searchByString(string);
        if (response.success) {
            return res.status(200).json(response);
        } else {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
