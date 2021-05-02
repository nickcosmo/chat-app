const Channel = require('../models/channel');
const mongodb = require('mongodb');

exports.postAddChannel = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const userId = req.user.id;
    const members = req.body.members;

    const newChannel = new Channel(name, description, userId, members);
    try {
        const response = await newChannel.create();
        return res.json(response);
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
        const response = await Channel.fetchById({_id: docId});
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};
