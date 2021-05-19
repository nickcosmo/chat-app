const Channel = require('../models/channel');
const User = require('../models/user');
const mongodb = require('mongodb');

exports.postAddChannel = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const userId = req.body.userId;
    const userName = req.body.userName;
    const members = [{ userName: req.body.userName, userId: req.body.userId }];

    const newChannel = new Channel(name, description, userId, members);
    try {
        const response = await newChannel.create();
        if (response.success) {
            await User.addChannel(userId, response.channel[0]._id, response.channel[0].name);
            return res.json(response);
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getChannels = async (req, res, next) => {
    try {
        const response = await Channel.fetchAll();
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};

exports.getChannelById = async (req, res, next) => {
    const id = req.params.id;
    const docId = new mongodb.ObjectID(id);
    try {
        const response = await Channel.fetchById({ _id: docId });
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};

exports.searchChannels = async (req, res, next) => {
    const string = req.body.string;
    try {
        const response = await Channel.searchByString(string);
        if (response.success) {
            return res.status(200).json(response);
        } else {
            throw new Error(response.message);
        }
    } catch (err) {
        console.log(err);
    }
};
